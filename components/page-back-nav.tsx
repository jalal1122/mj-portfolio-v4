import Link from "next/link";

interface PageBackNavProps {
  currentRoute: string;
}

export function PageBackNav({ currentRoute }: PageBackNavProps) {
  return (
    <nav className="border-b border-white/10 px-6 md:px-12 py-4 sticky top-0 z-40 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs text-muted-foreground hover:text-white transition-colors"
        >
          ← HOME
        </Link>
        <div className="font-mono text-xs text-muted-foreground">
          {currentRoute}
        </div>
      </div>
    </nav>
  );
}
