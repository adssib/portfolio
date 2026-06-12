import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// Site-wide monospace — JetBrains Mono, self-hosted via @fontsource (no CDN).
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import { Background } from "@/components/background";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const SITE_URL = "https://adssib.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adib Akkari · Software Engineer",
    template: "%s · Adib Akkari",
  },
  description:
    "Software engineer based in Montréal building production AI systems and full-stack apps. Currently at Ericsson on a cloud-native IAM platform serving 130M+ users.",
  keywords: [
    "Adib Akkari",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "LLM Fine-tuning",
    "QLoRA",
    "Next.js",
    "Montréal",
    "Concordia",
  ],
  authors: [{ name: "Adib Akkari" }],
  creator: "Adib Akkari",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Adib Akkari",
    title: "Adib Akkari · Software Engineer ",
    description:
      "Production AI systems and full-stack apps. Currently at Ericsson on a cloud-native IAM platform serving 130M+ users.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adib Akkari · Software Engineer ",
    description:
      "Production AI systems and full-stack apps. Currently at Ericsson on a cloud-native IAM platform serving 130M+ users.",
    creator: "@adssib",
  },
  // icons + Open Graph image are auto-wired from
  //   src/app/icon.tsx, src/app/apple-icon.tsx, src/app/opengraph-image.tsx
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Dark monochrome is the default (rendered on the server). The inline
      // script below switches to light only if the visitor explicitly chose it.
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* Respect a saved light choice before paint (default stays dark). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark');}catch(e){}})();`,
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Background />
        <div className="noise" aria-hidden />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
