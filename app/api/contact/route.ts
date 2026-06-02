import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  company: z.string().trim().optional().default(""),
  projectType: z.string().trim().min(1, "Project type is required"),
  email: z.string().trim().email("A valid email is required"),
  message: z.string().trim().min(1, "Message is required"),
});

function getEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const smtpHost = getEnv("SMTP_HOST");
    const smtpPort = Number(getEnv("SMTP_PORT"));
    const smtpUser = getEnv("SMTP_USER");
    const smtpPass = getEnv("SMTP_PASS");
    const contactToEmail = getEnv("CONTACT_TO_EMAIL");
    const contactFromEmail = getEnv("CONTACT_FROM_EMAIL");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `Portfolio contact: ${data.name} - ${data.projectType}`;
    const text = [
      `Name: ${data.name}`,
      `Company: ${data.company || "N/A"}`,
      `Project Type: ${data.projectType}`,
      `Email: ${data.email}`,
      "",
      data.message,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">New portfolio contact submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || "N/A")}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `Portfolio Contact <${contactFromEmail}>`,
      to: contactToEmail,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    return Response.json(
      { message: "Message sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send message.";

    if (message.includes("Missing environment variable")) {
      return Response.json({ error: message }, { status: 500 });
    }

    if (message.includes("required") || message.includes("email")) {
      return Response.json({ error: message }, { status: 400 });
    }

    return Response.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
