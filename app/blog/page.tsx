import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { loadPosts } from "@/lib/content/load";
import { EVIDENCE, formatContentDate } from "@/lib/format";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guías",
  description:
    "Guías de Portal FIT sobre suplementos y nutrición deportiva. Cada pieza lleva autor, revisor, fecha, fuentes y grado de evidencia. Las marcadas como ejemplo no son la versión editorial definitiva.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = loadPosts();
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Guías", path: "/blog" }]} />
        <JsonLd
          data={itemListJsonLd(
            "Guías",
            "/blog",
            posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
          )}
        />
        <div className="page-hero">
          <div className="kicker">Guías</div>
          <h1 className="h1">Lecturas con byline y fuentes</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 680 }}>
            La etapa 1 publica la plantilla con un artículo de ejemplo, tomado del boceto, y dos fichas cortas para que el índice no quede vacío. Todo lo marcado como ejemplo se reemplaza por un MDX de Redacción.
          </p>
        </div>
        <div className="pgrid">
          {posts.map((post) => (
            <Link className="pcard" href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: "none" }}>
              <Photo file={post.image} className="guide-ph" sizes="(max-width: 600px) 100vw, 40vw" alt="" />
              <div style={{ paddingTop: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {post.ejemplo ? <span className="ex-flag">Ejemplo</span> : null}
                <span className="xs">{formatContentDate(post.date)} · {post.readingMinutes} min</span>
                {post.evidence ? (
                  <span className={`pill ev ${EVIDENCE[post.evidence].chip}`}>
                    <span className="dot" />
                    {EVIDENCE[post.evidence].label}
                  </span>
                ) : null}
              </div>
              <h2 className="h3" style={{ marginTop: 12 }}>{post.title}</h2>
              <p className="small">{post.excerpt}</p>
              <p className="xs">
                {post.author} · Revisión: <Editorial text={post.reviewer} />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
