import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { getPublishedPosts } from "@/lib/content/load";
import { EVIDENCE, formatContentDate, publishedCopy } from "@/lib/format";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guías de suplementos en Argentina",
  description: "Guías de Portal FIT sobre suplementos y nutrición deportiva, con autor, fecha y fuentes.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();
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
            Cada guía lleva autor, fecha y fuentes.
          </p>
        </div>
        <div className="pgrid">
          {posts.map((post) => {
            const bajada = publishedCopy(post.bajada);
            return (
              <Link className="pcard" href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: "none" }}>
                {post.image ? (
                  <Photo file={post.image} className="guide-ph" sizes="(max-width: 600px) 100vw, 40vw" />
                ) : (
                  <div className="guide-fallback" aria-hidden>
                    <span className="kicker">Guía</span>
                  </div>
                )}
                <div style={{ paddingTop: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="xs">
                    {formatContentDate(post.date)}
                    {post.readingMinutes ? ` · ${post.readingMinutes} min` : ""}
                  </span>
                  {post.evidence ? (
                    <span className={`pill ev ${EVIDENCE[post.evidence].chip}`}>
                      <span className="dot" />
                      {EVIDENCE[post.evidence].label}
                    </span>
                  ) : null}
                </div>
                <h2 className="h3" style={{ marginTop: 12 }}>{post.h1}</h2>
                {bajada ? <p className="small">{bajada}</p> : null}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
