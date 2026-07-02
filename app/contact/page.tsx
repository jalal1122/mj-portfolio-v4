import type { Metadata } from "next";
import ContactLeftPane from "@/components/contact-left-pane";
import ContactRightPane from "@/components/contact-right-pane";
import { PageBackNav } from "@/components/page-back-nav";
import { site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: `Get in touch with ${site.name}. Let's discuss your next project.`,
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageBackNav currentRoute="/contact" />
      <main className="flex-1 bg-background flex flex-col md:flex-row">
        <ContactLeftPane />
        <ContactRightPane />
      </main>
    </div>
  );
}
