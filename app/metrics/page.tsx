import { Metadata } from "next";
import { MetricsHeader } from "@/components/metrics-header";
import { MacroReadouts } from "@/components/metrics-macro-readouts";
import { KineticHeatmap } from "@/components/metrics-kinetic-heatmap";
import { LanguageDNA } from "@/components/metrics-language-dna";
import { CapabilityMatrix } from "@/components/metrics-capability-matrix";
import { PageBackNav } from "@/components/page-back-nav";
import Link from "next/link";
import { site } from "@/lib/site-content";
import { getGitHubMetrics } from "@/lib/github";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: site.metrics.metadataTitle,
  description: site.metrics.metadataDescription,
};

export default async function MetricsPage() {
  const githubMetrics = await getGitHubMetrics();

  return (
    <main className="min-h-screen bg-background">
      <PageBackNav currentRoute="/metrics" />

      {/* Main content */}
      <div className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <MetricsHeader />

          {/* Dashboard grid */}
          <div className="space-y-8">
            <MacroReadouts githubMetrics={githubMetrics} />
            <KineticHeatmap />
            <LanguageDNA />
            <CapabilityMatrix />
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-2">
                  {site.metrics.refreshedCopy}
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  {site.metrics.sourceCopy}
                </p>
              </div>
              <Link
                href="/"
                className="font-mono text-xs text-accent hover:text-white transition-colors px-4 py-2 border border-white/10 rounded hover:border-white/30"
              >
                RETURN HOME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
