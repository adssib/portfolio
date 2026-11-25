import type { Metadata } from "next";
// Self-hosted variable fonts via @fontsource (no CDN).
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/instrument-sans/wght-italic.css";
import "./globals.css";

const SITE_URL = "https://adssib.github.io/portfolio";
const DESCRIPTION =
  "Adib Akkari builds AI systems that work in the real world: agents, model fine-tuning and evaluation, and the infrastructure underneath.";

export const metadata: Metadata = {
  // Origin only: Next adds the /portfolio basePath to image URLs itself,
  // so including it here doubled it (/portfolio/portfolio/...).
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: "Adib Akkari · Software Engineer",
    template: "%s · Adib Akkari",
  },
  description: DESCRIPTION,
  keywords: [
    "Adib Akkari",
    "Software Engineer",
    "AI Engineer",
    "Agentic AI",
    "MCP",
    "RAG",
    "QLoRA",
    "AI Consulting",
  ],
  authors: [{ name: "Adib Akkari" }],
  creator: "Adib Akkari",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Adib Akkari",
    title: "Adib Akkari · Software Engineer",
    description: "Engineer by day, somewhere in nature by weekend.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adib Akkari · Software Engineer",
    description: "Engineer by day, somewhere in nature by weekend.",
  },
  // icons + Open Graph image are auto-wired from
  //   src/app/icon.tsx, src/app/apple-icon.tsx, src/app/opengraph-image.png
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* Dusk is the default; switch to light before paint if chosen. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark');}catch(e){}})();`,
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
