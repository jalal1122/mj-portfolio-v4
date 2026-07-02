import { Metadata } from "next";
import { AboutIdentityHero } from "@/components/about-identity-hero";
import { AboutEras } from "@/components/about-eras";
import { AboutSkillsMatrix } from "@/components/about-skills-matrix";
import { AboutCDFooter } from "@/components/about-cd-footer";
import { PageBackNav } from "@/components/page-back-nav";
import { site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: site.description,
};

export default function AboutPage() {
  return (
    <main className="w-full bg-background relative overflow-x-hidden">
      <PageBackNav currentRoute="/about" />
      <AboutIdentityHero />
      <AboutEras />
      <AboutSkillsMatrix />
      <AboutCDFooter />
    </main>
  );  
}
