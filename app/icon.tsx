import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B3A2F",
          color: "#C4A574",
          fontSize: 36,
          fontStyle: "italic",
          borderRadius: 32,
        }}
      >
        F
      </div>
    ),
    { ...size },
  );
}
