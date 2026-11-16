import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { IconArrow } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { getCategoria, getEtapa, getEtapas, loadPosts } from "@/lib/content/load";
import { EVIDENCE, hostOf, isHttpUrl, pad2 } from "@/lib/format";
import { STAGE_PHOTOS } from "@/lib/photos";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getEtapas().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const etapa = getEtapa(slug);
  if (!etapa) return {};
  return pageMetadata({
    title: etapa.nombre,
    description: etapa.descripcion,
    path: `/etapas/${slug}`,
  });
}

export default async function EtapaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const etapa = getEtapa(slug);
  if (!etapa) notFound();
  const photo = STAGE_PHOTOS[slug] ?? "retrato-hombre.jpg";
  const posts = loadPosts().filter((post) => post.stage === slug);

  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Etapas de vida", path: "/etapas/30-39" },
            { name: etapa.nombre, path: `/etapas/${slug}` },
          ]}
        />
        <JsonLd
          data={itemListJsonLd(
            etapa.nombre,
            `/etapas/${slug}`,
            etapa.categorias_relacionadas.map((item) => ({
              name: getCategoria(item)?.nombre ?? item,
              path: `/categorias/${item}`,
            })),
          )}
        />
        <div className="ch-grid" style={{ marginTop: 18 }}>
          <div>
            <div className="kicker">Etapa de vida</div>
            <h1 className="h1" style={{ marginTop: 12 }}>{etapa.nombre}</h1>
            <p className="lede" style={{ marginTop: 16 }}>{etapa.descripcion}</p>
          </div>
          <Photo file={photo} className="ch-media" priority sizes="(max-width: 600px) 100vw, 40vw" credit alt="" />
        </div>
        <div className="rgrid" style={{ marginTop: 48 }}>
          <div>
            <div className="kicker">Enfoque editorial</div>
            <ol className="cindex" style={{ marginTop: 16 }}>
              {etapa.enfoque_editorial.map((item, index) => (
                <li key={item} style={{ padding: "16px 0" }}>
                  <span className="num">{pad2(index + 1)}</span>
                  <span>
                    <Editorial text={item} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="kicker">Categorías relacionadas</div>
            <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
              {etapa.categorias_relacionadas.map((item) => {
                const categoria = getCategoria(item);
                if (!categoria) return null;
                const meta = EVIDENCE[categoria.nivel_evidencia];
                return (
                  <Link className="cchip" href={`/categorias/${item}`} key={item} style={{ height: "auto", padding: "12px 14px", justifyContent: "space-between" }}>
                    <span>{categoria.nombre}</span>
                    <span className={`pill ev ${meta.chip}`}>
                      <span className="dot" />
                      {meta.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="srcbox" style={{ marginTop: 22 }}>
              <div className="kicker">Fuentes</div>
              <ol>
                {etapa.fuentes.map((fuente, index) => (
                  <li key={fuente}>
                    <span className="num">{pad2(index + 1)}</span>
                    <span>
                      {isHttpUrl(fuente) ? (
                        <a href={fuente} target="_blank" rel="noreferrer">{hostOf(fuente)}</a>
                      ) : (
                        <Editorial text={fuente} />
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        {posts.length > 0 ? (
          <div style={{ marginTop: 48 }}>
            <div className="kicker">Guías de esta etapa</div>
            <div className="mpg" style={{ marginTop: 16 }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  {post.ejemplo ? <span className="ex-flag">Ejemplo</span> : null}
                  <h2 className="h3" style={{ marginTop: 10 }}>{post.title}</h2>
                  <span className="link" style={{ marginTop: 12 }}>
                    Leer <IconArrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="small" style={{ marginTop: 36 }}>
            Todavía no hay una guía publicada para esta etapa. Las que existan van a decir si son contenido de ejemplo.
          </p>
        )}
      </div>
    </section>
  );
}
