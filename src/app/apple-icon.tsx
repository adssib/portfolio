import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121212",
          color: "#f5f5f3",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: "-0.06em",
          borderRadius: 36,
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.16)",
        }}
      >
        A.A.
      </div>
    ),
    { ...size }
  );
}
