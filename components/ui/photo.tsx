import Image from "next/image";
import type { ReactNode } from "react";
import { photoByFile } from "@/lib/photos";
import { cx } from "@/lib/format";

export function Photo({
  file,
  className,
  priority = false,
  quality = 75,
  sizes = "(max-width: 600px) 100vw, 640px",
  position = "50% 50%",
  alt,
  credit = false,
  tag,
  children,
}: {
  file: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  position?: string;
  alt?: string;
  credit?: boolean;
  tag?: string;
  children?: ReactNode;
}) {
  const photo = photoByFile(file);
  return (
    <div className={cx("ph", className)}>
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        priority={priority}
        quality={quality}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        style={{ objectPosition: position }}
      />
      {tag ? (
        <span className="ph-tag" style={{ left: 16, top: 16 }}>
          {tag}
        </span>
      ) : null}
      {credit ? <span className="credit">{photo.credit}</span> : null}
      {children}
    </div>
  );
}
