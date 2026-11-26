import Link from "next/link";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Crumbs } from "@/components/ui/crumbs";
import { FaqList } from "@/components/ui/faq-list";
import { IconArrow } from "@/components/ui/icons";
import { MlCard } from "@/components/ui/ml-card";
import { Photo } from "@/components/ui/photo";
import { blockHasAffiliate, getAffiliateProduct } from "@/lib/affiliates";
import { AffiliateNotice } from "@/components/ui/affiliate-notice";
import { MICROCOPY } from "@/lib/microcopy";
import { getCategorias, getPublishedPosts, headingId, type Post } from "@/lib/content/load";
import { GuideCardMedia, GuideCover } from "@/components/blog/guide-media";
import { GuideToc } from "@/components/blog/guide-toc";
import { EVIDENCE, formatContentDate, initials, pad2, publishedCopy } from "@/lib/format";
import { absoluteUrl, getSiteName } from "@/lib/site";

function plainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map((item) => plainText(item)).join("");
  if (typeof node === "object" && "props" in node) {
    return plainText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function MarkdownHeading({ level, children }: { level: 2 | 3; children?: ReactNode }) {
  const id = headingId(plainText(children));
  if (level === 2) return <h2 id={id}>{children}</h2>;
  return <h3 id={id}>{children}</h3>;
}

function splitTitle(title: string) {
  const visible = publishedCopy(title) ?? title;
  const colon = visible.indexOf(":");
  if (colon === -1) return visible;
  return (
    <>
      {visible.slice(0, colon + 1)} <em>{visible.slice(colon + 1).trim()}</em>
    </>
  );
}

export function ArticleView({ post }: { post: Post }) {
  const categories = getCategorias();
  const bySlug = new Map(categories.map((item) => [item.slug, item]));
  const others = getPublishedPosts().filter((item) => item.slug !== post.slug).slice(0, 3);
  const products = post.relatedProducts.map((id) => getAffiliateProduct(id)).filter((item) => item !== undefined);
  const shareUrl = absoluteUrl(`/blog/${post.slug}`);
  const shareText = encodeURIComponent(`${post.h1} · ${getSiteName()}`);
  const encodedUrl = encodeURIComponent(shareUrl);
  const reviewer = post.reviewer ? publishedCopy(post.reviewer) : null;
  const bajada = publishedCopy(post.bajada);
  const chips = post.categories.flatMap((slug) => {
    const category = bySlug.get(slug);
    return category ? [{ slug, name: category.nombre }] : [];
  });

  return (
    <>
      <header className="ahead">
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Guías", path: "/blog" },
              { name: post.h1, path: `/blog/${post.slug}` },
            ]}
          />
          <div className="ah-in">
            <div className="kicker">Guía</div>
            <h1 className="h1 ah-t">{splitTitle(post.h1)}</h1>
            {bajada ? <p className="lede" style={{ marginTop: 16 }}>{bajada}</p> : null}
            {chips.length > 0 ? (
              <div className="cats-chips" style={{ justifyContent: "center" }}>
                {chips.map((chip) => (
                  <Link className="cchip" href={`/categorias/${chip.slug}`} key={chip.slug}>
                    {chip.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="ribbon">
            <div className="rb">
              <span className="av">{initials(post.author)}</span>
              <div>
                <span className="xs">Escribe</span>
                <b style={{ display: "block" }}>{post.author}</b>
              </div>
            </div>
            {reviewer ? (
              <div className="rb">
                <span className="av">{initials(reviewer)}</span>
                <div>
                  <span className="xs">Revisado por</span>
                  <b style={{ display: "block" }}>{reviewer}</b>
                  {post.reviewerRole ? <span className="xs">{post.reviewerRole}</span> : null}
                </div>
              </div>
            ) : null}
            <div className="rb">
              <div>
                <span className="xs">Publicado</span>
                <b style={{ display: "block" }}>{formatContentDate(post.date)}</b>
              </div>
            </div>
            {post.readingMinutes ? (
              <div className="rb">
                <div>
                  <span className="xs">Lectura</span>
                  <b style={{ display: "block" }}>{post.readingMinutes} min</b>
                </div>
              </div>
            ) : null}
            {post.sources.length > 0 ? (
              <div className="rb">
                <div>
                  <span className="xs">Fuentes</span>
                  <b style={{ display: "block" }}>{post.sources.length}</b>
                </div>
              </div>
            ) : null}
          </div>
          {post.cover ? (
            <figure className="guide-hero">
              <GuideCover
                cover={post.cover}
                priority
                sizes="(max-width: 600px) 100vw, 1280px"
              />
            </figure>
          ) : null}
        </div>
      </header>
      {!post.cover && post.image ? (
        <div className="wrap">
          <Photo file={post.image} className="afig" priority sizes="(max-width: 600px) 100vw, 1200px" credit />
          {post.imageCredit ? (
            <p className="xs" style={{ marginTop: 10 }}>
              Imagen ilustrativa. {post.imageCredit}
            </p>
          ) : null}
        </div>
      ) : null}
      <section className="abody">
        <div className={post.rail.length > 0 ? "wrap ab-grid" : "wrap ab-grid no-rail"}>
          <aside className="toc">
            <GuideToc items={post.toc} />
            <div className="share">
              <span className="xs">Compartir</span>
              <a className="sb" href={`https://wa.me/?text=${shareText}%20${encodedUrl}`} target="_blank" rel="noreferrer">WA</a>
              <a className="sb" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer">in</a>
              <a className="sb" href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`} target="_blank" rel="noreferrer">X</a>
              <a className="sb" href={shareUrl} aria-label="Enlace de esta guía">↗</a>
            </div>
          </aside>
          <article className="prose">
            <MDXRemote
              source={post.body}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={{
                h1: ({ children }) => <MarkdownHeading level={2}>{children}</MarkdownHeading>,
                h2: ({ children }) => <MarkdownHeading level={2}>{children}</MarkdownHeading>,
                h3: ({ children }) => <MarkdownHeading level={3}>{children}</MarkdownHeading>,
                table: ({ children }) => (
                  <div className="table-scroll">
                    <table>{children}</table>
                  </div>
                ),
                a: ({ href, children }) =>
                  href?.startsWith("/") ? (
                    <Link href={href}>{children}</Link>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  ),
              }}
            />
            {products.length > 0 ? (
              <div className="related">
                <span className="kicker">Productos mencionados en esta guía</span>
                <div className="rl-g">
                  {products.map((product) => (
                    <MlCard key={product.id} product={product} />
                  ))}
                </div>
                <AffiliateNotice text={MICROCOPY.articuloProductos} show={blockHasAffiliate(products)} />
              </div>
            ) : null}
            {post.faq.length > 0 ? (
              <>
                <h2 id={headingId("Preguntas frecuentes")}>Preguntas frecuentes</h2>
                <FaqList items={post.faq} verbatim />
              </>
            ) : null}
            <div className="author" style={{ marginTop: 28, display: "flex", gap: 16 }}>
              <span className="av" style={{ width: 64, height: 64, fontSize: 20 }}>{initials(post.author)}</span>
              <div>
                <span className="xs">Sobre quién escribe</span>
                <b className="h4" style={{ display: "block", marginTop: 4 }}>{post.author}</b>
                <p className="small" style={{ marginTop: 6 }}>
                  Somos el equipo que investiga y escribe Portal FIT. Leemos estudios, rótulos y registros públicos, y en cada guía te dejamos las fuentes para que puedas chequearlas.
                </p>
              </div>
            </div>
            {post.sources.length > 0 ? (
              <div className="srcl">
                <div className="kicker">Fuentes</div>
                <ol>
                  {post.sources.map((source, index) => {
                    const title = publishedCopy(source.titulo);
                    if (!title) return null;
                    return (
                      <li key={`${source.titulo}-${index}`}>
                        <span className="num">{pad2(index + 1)}</span>
                        <span>
                          {source.url ? (
                            <a href={source.url} target="_blank" rel="noreferrer">{title}</a>
                          ) : (
                            title
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : null}
          </article>
          {post.rail.length > 0 ? (
            <aside className="rail">
              <div className="snap">
                <div className="sn-h">
                  <b>Evidencia en esta guía</b>
                </div>
                {post.rail.map((slug) => {
                  const categoria = bySlug.get(slug);
                  if (!categoria) return null;
                  const meta = EVIDENCE[categoria.nivel_evidencia];
                  return (
                    <Link className="snr" href={`/categorias/${slug}`} key={slug}>
                      {meta.grade ? <span className={`grade ${meta.gradeClass}`}>{meta.grade}</span> : <span className="grade">·</span>}
                      <div>
                        <b>{categoria.nombre}</b>
                        <span className="xs" style={{ display: "block" }}>Evidencia {meta.label.toLowerCase()}</span>
                      </div>
                    </Link>
                  );
                })}
                <Link className="link" href="/como-evaluamos" style={{ marginTop: 14, fontSize: 13.5 }}>
                  Cómo evaluamos <IconArrow />
                </Link>
              </div>
            </aside>
          ) : null}
        </div>
      </section>
      {others.length > 0 ? (
        <section className="sec-sm" style={{ borderTop: "1px solid var(--line)", paddingBottom: 96 }}>
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="kicker">Seguí leyendo</div>
                <h2 className="h2">Más guías <em>con fuentes</em></h2>
              </div>
              <Link className="link" href="/blog">
                Todas las guías <IconArrow />
              </Link>
            </div>
            <div className="mpg">
              {others.map((item) => (
                <Link href={`/blog/${item.slug}`} key={item.slug} style={{ textDecoration: "none" }}>
                  <GuideCardMedia post={item} sizes="(max-width: 900px) 100vw, 400px" />
                  <h3 className="h3" style={{ marginTop: 10, fontSize: 22 }}>{item.h1}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
