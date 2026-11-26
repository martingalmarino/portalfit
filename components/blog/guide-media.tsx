import Image from "next/image";
import { Photo } from "@/components/ui/photo";
import type { GuideImage, GuideStill } from "@/lib/content/schema";
import type { Post } from "@/lib/content/load";
import { cx } from "@/lib/format";

type Still = GuideStill | GuideImage;

/** Still 16:10. Sin el filtro sepia de las fotos de stock: estas piezas ya vienen en la paleta del sitio. */
export function GuideCover({
  cover,
  className,
  priority = false,
  sizes,
}: {
  cover: Still;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className={cx("guide-photo", className)}>
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        priority={priority}
        quality={75}
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

/** Portada de card. Con imagen propia reemplaza el recuadro verde; sin ella, lo conserva. */
export function GuideCardMedia({
  post,
  sizes,
  priority = false,
}: {
  post: Post;
  sizes: string;
  priority?: boolean;
}) {
  if (post.cover) {
    return <GuideCover cover={post.cover} sizes={sizes} priority={priority} />;
  }
  if (post.image) {
    return <Photo file={post.image} className="guide-ph" sizes={sizes} priority={priority} />;
  }
  return (
    <div className="guide-fallback" aria-hidden>
      <span className="kicker">Guía</span>
    </div>
  );
}
