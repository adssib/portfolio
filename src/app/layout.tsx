import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Background } from "@/components/background";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const SITE_URL = "https://adib-akkari.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adib Akkari · Software Engineer d",
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
      // Light monochrome is the v2.0 default. To flip the whole site to the
      // dark monochrome variant, append ` dark` to the className below.
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* Set the theme class before paint to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
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
