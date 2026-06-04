import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { TechTicker } from "@/components/tech-ticker";
import { BentoGrid } from "@/components/bento-grid";
import { ProjectsSection } from "@/components/projects-section";
import { TrustSection } from "@/components/trust-section";
import { FooterSection } from "@/components/footer-section";
import { WelcomeSplash } from "@/components/welcome-splash";
import { getGitHubMetrics } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const githubMetrics = await getGitHubMetrics();

  return (
    <main className="relative">
      <WelcomeSplash />
      <HeroSection />
      <TechTicker />
      <BentoGrid githubMetrics={githubMetrics} />
      <ProjectsSection />
      <TrustSection />
      <FooterSection />
    </main>
  );
}
