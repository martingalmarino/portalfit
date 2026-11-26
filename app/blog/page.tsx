import Link from "next/link";
import { GuideCardMedia, GuideCover } from "@/components/blog/guide-media";
import { Crumbs } from "@/components/ui/crumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { getBlogHero, getPublishedPosts } from "@/lib/content/load";
import { EVIDENCE, formatContentDate, publishedCopy } from "@/lib/format";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guías de suplementos en Argentina",
  description: "Guías de Portal FIT sobre suplementos y nutrición deportiva, con autor, fecha y fuentes.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();
  const hero = getBlogHero();
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
          {hero ? (
            <GuideCover
              cover={hero}
              className="page-hero-photo"
              priority
              sizes="(max-width: 600px) 100vw, 1280px"
            />
          ) : null}
        </div>
        <div className="pgrid">
          {posts.map((post, index) => {
            const bajada = publishedCopy(post.bajada);
            return (
              <Link className="pcard" href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: "none" }}>
                <GuideCardMedia
                  post={post}
                  sizes={index === 0 ? "(max-width: 900px) 100vw, 640px" : "(max-width: 900px) 100vw, 400px"}
                />
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
