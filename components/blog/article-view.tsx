import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Check, Checks, ExampleNote, GuideLink, H, Quote, Study, Tldr, CalcTable } from "@/components/blog/mdx";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { FaqList } from "@/components/ui/faq-list";
import { IconArrow } from "@/components/ui/icons";
import { MlCard } from "@/components/ui/ml-card";
import { Photo } from "@/components/ui/photo";
import { getAffiliateProduct } from "@/lib/affiliates";
import { getCategorias, loadPosts, type Post } from "@/lib/content/load";
import { EVIDENCE, formatContentDate, hasPendingToken, initials, isHttpUrl, pad2 } from "@/lib/format";
import { absoluteUrl, getSiteName } from "@/lib/site";

export function ArticleView({ post }: { post: Post }) {
  const categories = getCategorias();
  const bySlug = new Map(categories.map((item) => [item.slug, item]));
  const others = loadPosts().filter((item) => item.slug !== post.slug).slice(0, 3);
  const products = post.relatedProducts.map((id) => getAffiliateProduct(id)).filter((item) => item !== undefined);
  const shareUrl = absoluteUrl(`/blog/${post.slug}`);
  const shareText = encodeURIComponent(`${post.title} · ${getSiteName()}`);
  const encodedUrl = encodeURIComponent(shareUrl);
  const reviewerPending = hasPendingToken(post.reviewer);

  return (
    <>
      <header className="ahead">
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Guías", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />
          <div className="ah-in">
            <div className="kicker">{post.kicker}</div>
            {post.ejemplo ? <div style={{ marginTop: 12 }}><span className="ex-flag">Contenido de ejemplo</span></div> : null}
            <h1 className="h1 ah-t">
              {post.title.includes(":") ? (
                <>
                  {post.title.slice(0, post.title.indexOf(":") + 1)}{" "}
                  <em>{post.title.slice(post.title.indexOf(":") + 1).trim()}</em>
                </>
              ) : (
                post.title
              )}
            </h1>
            <p className="lede" style={{ marginTop: 16 }}>{post.excerpt}</p>
          </div>
          <div className="ribbon">
            <div className="rb">
              <span className="av">{initials(post.author)}</span>
              <div>
                <span className="xs">Escribe</span>
                <b style={{ display: "block" }}>{post.author}</b>
              </div>
            </div>
            <div className="rb">
              <span className={reviewerPending ? "av pend-av" : "av"}>{reviewerPending ? "?" : initials(post.reviewer)}</span>
              <div>
                <span className="xs">Revisado por</span>
                <b style={{ display: "block" }}>
                  <Editorial text={post.reviewer} />
                </b>
                <span className="xs">{post.reviewerRole}</span>
              </div>
            </div>
            <div className="rb">
              <div>
                <span className="xs">Actualizado</span>
                <b style={{ display: "block" }}>{formatContentDate(post.date)}</b>
              </div>
            </div>
            <div className="rb">
              <div>
                <span className="xs">Lectura</span>
                <b style={{ display: "block" }}>{post.readingMinutes} min</b>
              </div>
            </div>
            <div className="rb">
              <div>
                <span className="xs">Fuentes</span>
                <b style={{ display: "block" }}>{post.sources.length}</b>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="wrap">
        <Photo file={post.image} className="afig" priority sizes="(max-width: 600px) 100vw, 1200px" credit alt="" />
        <p className="xs" style={{ marginTop: 10 }}>
          Imagen ilustrativa. {post.imageCredit}
        </p>
      </div>
      <section className="abody">
        <div className="wrap ab-grid">
          <aside className="toc">
            <div className="kicker" style={{ fontSize: 10.5 }}>En esta guía</div>
            <ol>
              {post.toc.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <span className="num">{pad2(index + 1)}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
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
              components={{ H, Tldr, Study, CalcTable, Quote, Checks, Check, ExampleNote, GuideLink }}
            />
            {products.length > 0 ? (
              <div className="related">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end", flexWrap: "wrap" }}>
                  <div>
                    <span className="kicker">Productos mencionados en esta guía</span>
                    <h3 className="h3" style={{ marginTop: 8, fontSize: 24 }}>
                      Opciones disponibles en <em className="it" style={{ color: "var(--forest-3)" }}>Mercado Libre</em>
                    </h3>
                  </div>
                  <span className="ex-flag">Precios de ejemplo</span>
                </div>
                <div className="rl-g">
                  {products.map((product) => (
                    <MlCard key={product.id} product={product} />
                  ))}
                </div>
                <p className="xs" style={{ marginTop: 12 }}>
                  Mencionarlos no es una recomendación individual. Enlaces de afiliado: podemos recibir una comisión.
                </p>
              </div>
            ) : null}
            <h2 id="faq">
              <span className="hn">{pad2(post.toc.length)}</span>
              Preguntas frecuentes
            </h2>
            <FaqList items={post.faq} />
            <div className="author" style={{ marginTop: 28, display: "flex", gap: 16 }}>
              <span className="av" style={{ width: 64, height: 64, fontSize: 20 }}>{initials(post.author)}</span>
              <div>
                <span className="xs">Sobre quien escribe</span>
                <b className="h4" style={{ display: "block", marginTop: 4 }}>{post.author}</b>
                <p className="small" style={{ marginTop: 6 }}>
                  Perfil a definir. Cada guía lleva firma, revisor/a y fecha de actualización. El revisor de esta pieza está pendiente.
                </p>
              </div>
            </div>
            <div className="srcl">
              <div className="kicker">Fuentes</div>
              <ol>
                {post.sources.map((source, index) => {
                  const url = source.match(/https?:\/\/\S+/)?.[0];
                  return (
                    <li key={source}>
                      <span className="num">{pad2(index + 1)}</span>
                      <span>
                        {url && isHttpUrl(url) ? (
                          <a href={url} target="_blank" rel="noreferrer">
                            <Editorial text={source.replace(url, "").replace(/·\s*$/, "").trim()} />
                          </a>
                        ) : (
                          <Editorial text={source} />
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </article>
          <aside className="rail">
            <div className="snap">
              <div className="sn-h" style={{ display: "flex", justifyContent: "space-between" }}>
                <b>Evidencia en esta guía</b>
                <span className="xs">AIS · ISSN</span>
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
                      <span className="xs" style={{ display: "block" }}>
                        Evidencia {meta.label.toLowerCase()}
                        {meta.grade ? ` · AIS Grupo ${meta.grade}` : ""}
                      </span>
                    </div>
                  </Link>
                );
              })}
              <p className="xs" style={{ marginTop: 12 }}>
                Grados A–D según el AIS Sports Supplement Framework. Nivel general por categoría.
              </p>
              <Link className="link" href="/como-evaluamos" style={{ marginTop: 14, fontSize: 13.5 }}>
                Cómo evaluamos <IconArrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>
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
                <Photo file={item.image} className="guide-ph" sizes="30vw" tag={item.kicker} alt="" />
                {item.ejemplo ? <span className="ex-flag" style={{ marginTop: 14 }}>Ejemplo</span> : null}
                <h3 className="h3" style={{ marginTop: 10, fontSize: 22 }}>{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
