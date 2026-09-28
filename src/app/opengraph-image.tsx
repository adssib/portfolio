import { ImageResponse } from "next/og";

export const alt = "Adib Akkari, software engineer. Engineer by day, somewhere in nature by weekend.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the site hero: a dusk sky fading to the horizon, with ridges below.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "96px 88px",
          background:
            "linear-gradient(180deg, #0c1222 0%, #18244a 32%, #3c4470 55%, #a7677a 76%, #e79a62 92%, #f2b070 100%)",
          color: "#f3e9dc",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 128, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, display: "flex" }}>
          Adib Akkari
        </div>
        <div style={{ marginTop: 28, fontSize: 40, color: "rgba(243,233,220,0.85)", display: "flex" }}>
          Engineer by day, somewhere in nature by weekend.
        </div>
        <svg
          width="1200"
          height="200"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <path fill="#2a3452" d="M0 190C120 150 220 120 330 140S520 90 640 120 860 60 980 110 1200 150 1300 120 1400 100 1440 110V320H0Z" />
          <path fill="#1c2540" d="M0 240C140 200 260 215 380 190S600 230 760 200 1000 170 1140 210 1360 200 1440 190V320H0Z" />
          <path fill="#0f1522" d="M0 290C200 260 380 285 560 270S900 250 1100 275 1340 265 1440 260V320H0Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
