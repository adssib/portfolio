import { ImageResponse } from "next/og";

export const alt =
  "Adib Akkari — Software Engineer building AI systems end-to-end";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0a0612 0%, #1a0b2e 45%, #060410 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Soft violet glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 700,
            height: 700,
            borderRadius: 700,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.42), rgba(139,92,246,0) 70%)",
            display: "flex",
          }}
        />
        {/* Soft cyan glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -250,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: 600,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.4), rgba(124,58,237,0) 70%)",
            display: "flex",
          }}
        />

        {/* Decorative star dots */}
        {[
          [120, 90, 3],
          [220, 180, 2],
          [980, 110, 4],
          [1080, 220, 2],
          [870, 60, 3],
          [60, 380, 2],
          [1120, 480, 3],
          [180, 540, 2],
          [950, 560, 2],
        ].map(([x, y, s], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: y,
              left: x,
              width: s,
              height: s,
              background: "white",
              borderRadius: s,
              opacity: 0.7,
              display: "flex",
            }}
          />
        ))}

        {/* Header row: monogram + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #1a0b2e 0%, #4c1d95 55%, #0a0612 100%)",
              color: "white",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.18)",
            }}
          >
            A.A.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              fontSize: 20,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#a78bfa",
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>Montréal · Available 2027</div>
          </div>
        </div>

        {/* Name + tagline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Adib Akkari.
          </div>
          <div
            style={{
              fontSize: 40,
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Software engineer building{" "}
            <span style={{ color: "#c4b5fd", marginLeft: 10, marginRight: 10 }}>
              AI systems
            </span>{" "}
            end-to-end.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>adib-akkari.netlify.app</div>
          <div
            style={{
              display: "flex",
              gap: 18,
              fontFamily: "monospace",
              fontSize: 18,
            }}
          >
            <div style={{ display: "flex" }}>github.com/adssib</div>
            <div style={{ display: "flex" }}>·</div>
            <div style={{ display: "flex" }}>linkedin.com/in/adib-akkari</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
