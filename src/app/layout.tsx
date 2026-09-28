import type { Metadata } from "next";
// Self-hosted variable fonts via @fontsource (no CDN).
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/instrument-sans/wght-italic.css";
import "./globals.css";

const SITE_URL = "https://adssib.github.io/portfolio";
const DESCRIPTION =
  "Adib Akkari, software engineer. Engineer by day, somewhere in nature by weekend. AI agents, reliable systems, and freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    "Freelance",
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
  //   src/app/icon.tsx, src/app/apple-icon.tsx, src/app/opengraph-image.tsx
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
