import { ImageResponse } from "next/og";
import { getSiteName } from "@/lib/site";

export const alt = "Portal FIT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const name = getSiteName();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1B3A2F",
          color: "#F6F3EE",
          padding: "72px",
        }}
      >
        <div style={{ color: "#C4A574", fontSize: 28, letterSpacing: 4 }}>GUÍA INDEPENDIENTE · ARGENTINA</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, lineHeight: 1, fontStyle: "italic" }}>{name}</div>
          <div style={{ fontSize: 36, maxWidth: 860, color: "#E7E1D4" }}>
            Suplementos y nutrición deportiva, explicados con evidencia.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#C4A574" }}>Contenido informativo, no médico</div>
      </div>
    ),
    { ...size },
  );
}
