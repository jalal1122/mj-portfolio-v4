import type { Metadata } from "next";
import ContactLeftPane from "@/components/contact-left-pane";
import ContactRightPane from "@/components/contact-right-pane";
import { site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: `Get in touch with ${site.name}. Let's discuss your next project.`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background flex">
      <ContactLeftPane />
      <ContactRightPane />
    </main>
  );
}
