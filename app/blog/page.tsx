import Link from "next/link";
import { GuideCardMedia, GuideCover } from "@/components/blog/guide-media";
import { HubH2, linkParts } from "@/components/hub/copy-block";
import { Crumbs } from "@/components/ui/crumbs";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { getBlogHero, getCategoria, getPublishedPosts } from "@/lib/content/load";
import { loadHubs } from "@/lib/content/hubs";
import type { Post } from "@/lib/content/load";
import { EVIDENCE, formatContentDate, publishedCopy } from "@/lib/format";
import { collectionPageJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const hub = loadHubs().blog;

export const metadata = pageMetadata({
  title: hub.title,
  description: hub.description,
  path: "/blog",
});

function GuideCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const bajada = publishedCopy(post.bajada);
  const categoria = post.categories[0] ? getCategoria(post.categories[0]) : undefined;
  return (
    <Link className="pcard" href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <GuideCardMedia
        post={post}
        sizes={featured ? "(max-width: 900px) 100vw, 640px" : "(max-width: 900px) 100vw, 400px"}
      />
      <div style={{ paddingTop: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {categoria ? <span className="xs">{categoria.nombre}</span> : null}
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
      <h3 className="h3" style={{ marginTop: 12 }}>{post.h1}</h3>
      {bajada ? <p className="small">{bajada}</p> : null}
    </Link>
  );
}

export default function BlogPage() {
  const posts = getPublishedPosts();
  const hero = getBlogHero();
  const destacada = posts.find((post) => post.slug === hub.destacada_slug);
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Guías", path: "/blog" }]} />
        <JsonLd
          data={collectionPageJsonLd({
            name: hub.h1,
            description: hub.description,
            path: "/blog",
            listName: "Guías",
            items: posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
          })}
        />
        <JsonLd data={faqJsonLd(hub.faq)} />
        <div className="page-hero">
          <div className="kicker">{hub.kicker}</div>
          <h1 className="h1">{hub.h1}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 680 }}>
            {hub.intro}
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

        {destacada ? (
          <>
            <HubH2>{hub.destacada_h2}</HubH2>
            <div className="pgrid" style={{ gridTemplateColumns: "minmax(0, 640px)" }}>
              <GuideCard post={destacada} featured />
            </div>
          </>
        ) : null}

        <HubH2>{hub.lista_h2}</HubH2>
        <div className="pgrid">
          {posts.map((post) => (
            <GuideCard key={post.slug} post={post} />
          ))}
        </div>

        <HubH2>{hub.seguir_h2}</HubH2>
        <div className="hub-links">
          {hub.seguir.map((item) => {
            const link = linkParts(item);
            return (
              <Link className="link" href={link.url} key={link.url}>
                {link.texto}
              </Link>
            );
          })}
        </div>

        <HubH2>{hub.faq_h2}</HubH2>
        <FaqList items={hub.faq} />
      </div>
    </section>
  );
}
