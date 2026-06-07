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
          background: "linear-gradient(135deg, #f5f5f3 0%, #e9e9e6 100%)",
          color: "#121212",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Soft monochrome glows */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 700,
            height: 700,
            borderRadius: 700,
            background:
              "radial-gradient(circle, rgba(0,0,0,0.06), rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -250,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: 600,
            background:
              "radial-gradient(circle, rgba(0,0,0,0.05), rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />

        {/* Decorative grid dots */}
        {[
          [120, 90, 4],
          [220, 180, 3],
          [980, 110, 5],
          [1080, 220, 3],
          [870, 60, 4],
          [60, 380, 3],
          [1120, 480, 4],
          [180, 540, 3],
          [950, 560, 3],
        ].map(([x, y, s], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: y,
              left: x,
              width: s,
              height: s,
              background: "#121212",
              borderRadius: s,
              opacity: 0.22,
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
              background: "#121212",
              color: "#f5f5f3",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.06em",
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
              background: "rgba(0,0,0,0.03)",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.7)",
              fontSize: 20,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#121212",
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
              color: "rgba(0,0,0,0.55)",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Software engineer building{" "}
            <span style={{ color: "#121212", marginLeft: 10, marginRight: 10 }}>
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
            color: "rgba(0,0,0,0.5)",
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
