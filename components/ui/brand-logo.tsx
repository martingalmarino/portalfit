import Image from "next/image";
import { logoFor, type LogoBox } from "@/lib/logos";

export function BrandLogo({
  slug,
  name,
  variant,
  scale = 1,
}: {
  slug: string;
  name: string;
  variant: "card" | "chip" | "hero";
  scale?: number;
}) {
  const spec = logoFor(slug);
  if (!spec) return <span className="brandname">{name}</span>;
  const box: LogoBox = spec[variant];
  const width = Math.round(box.w * scale);
  const height = Math.round(box.h * scale);
  return (
    <Image
      src={spec.src}
      alt={name}
      width={Math.max(width * 2, 1)}
      height={Math.max(height * 2, 1)}
      style={{ width, height, objectFit: "contain" }}
    />
  );
}
