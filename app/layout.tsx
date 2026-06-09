import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/lib/site-content";
import { CommandTerminal } from "@/components/command-terminal";
import { Navigation } from "@/components/navigation";
import Script from 'next/script'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  generator: "mjdevportfolio",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="ERC8ACNHHFZMVrNbwZEioSnx_F-gPE_EzTAfHAXVvUQ"
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen"
        suppressHydrationWarning
      >
        <div className="noise-overlay" aria-hidden="true" />
        <Navigation />
        <CommandTerminal />
        {children}

        {/* Vercel Analytics */}
        {process.env.NODE_ENV === "production" && <Analytics />}

        {/* Google Analytics Scripts */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-0ZDYVHMFYG"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0ZDYVHMFYG');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
