import { Metadata } from "next";
import { MetricsHeader } from "@/components/metrics-header";
import { MacroReadouts } from "@/components/metrics-macro-readouts";
import { KineticHeatmap } from "@/components/metrics-kinetic-heatmap";
import { LanguageDNA } from "@/components/metrics-language-dna";
import { CapabilityMatrix } from "@/components/metrics-capability-matrix";
import Link from "next/link";
import { site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: site.metrics.metadataTitle,
  description: site.metrics.metadataDescription,
};

export default function MetricsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation breadcrumb */}
      <nav className="border-b border-white/10 px-6 md:px-12 py-4 sticky top-0 z-40 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground hover:text-white transition-colors"
          >
            ← HOME
          </Link>
          <div className="font-mono text-xs text-muted-foreground">
            /metrics
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <MetricsHeader />

          {/* Dashboard grid */}
          <div className="space-y-8">
            <MacroReadouts />
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
