import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { FaqList } from "@/components/ui/faq-list";
import { IconArrow } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { getCategoria, getEtapa, getEtapas, getPublishedPosts } from "@/lib/content/load";
import { EVIDENCE, pad2, publicCopy, type EvidenceLevel } from "@/lib/format";
import { STAGE_PHOTOS } from "@/lib/photos";
import { faqJsonLd, itemListJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getEtapas().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const etapa = getEtapa(slug);
  if (!etapa) return {};
  return pageMetadata({
    title: etapa.meta_title,
    description: etapa.meta_description,
    path: `/etapas/${slug}`,
  });
}

const INDEX = [
  { id: "enfoque", label: "Lo esencial" },
  { id: "prioridades", label: "Prioridades" },
  { id: "nutrientes", label: "Nutrientes a vigilar" },
  { id: "suplementos", label: "Suplementos" },
  { id: "errores", label: "Errores comunes" },
  { id: "semana", label: "Semana tipo" },
  { id: "faq", label: "Preguntas frecuentes" },
  { id: "leer", label: "Seguí leyendo" },
  { id: "fuentes", label: "Fuentes" },
] as const;

const TIPO: Record<"entrenamiento" | "nutricion" | "habitos", string> = {
  entrenamiento: "Entrenamiento",
  nutricion: "Nutrición",
  habitos: "Hábitos",
};

const GRUPOS = [
  { key: "con_sentido", title: "Con sentido", className: "is-yes" },
  { key: "poca_evidencia", title: "Poca evidencia", className: "is-limited" },
  { key: "evitar", title: "Evitar", className: "is-avoid" },
] as const;

function EvidencePill({ level }: { level: EvidenceLevel }) {
  const meta = EVIDENCE[level];
  return (
    <span className={`pill ev ${meta.chip}`}>
      <span className="dot" />
      {meta.label}
    </span>
  );
}

function Fuentes({ ids }: { ids: number[] }) {
  if (ids.length === 0) return null;
  return (
    <sup className="etapa-refs">
      {ids.map((id, index) => (
        <a key={id} href={`#fuente-${id}`}>
          {index > 0 ? " " : ""}
          {id}
        </a>
      ))}
    </sup>
  );
}

function Band({
  id,
  kicker,
  title,
  lede,
  surface = false,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lede?: ReactNode;
  surface?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={surface ? "sec surface etapa" : "sec etapa"} style={surface ? { background: "var(--paper-2)" } : undefined}>
      <div className="wrap">
        <div className="kicker">{kicker}</div>
        <h2 className="h2" style={{ marginTop: 12 }}>{title}</h2>
        {lede ? <div className="lede" style={{ marginTop: 14, maxWidth: "68ch" }}>{lede}</div> : null}
        {children}
      </div>
    </section>
  );
}

export default async function EtapaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const etapa = getEtapa(slug);
  if (!etapa) notFound();
  const photo = STAGE_PHOTOS[slug] ?? "retrato-hombre.jpg";
  const posts = getPublishedPosts().filter((post) => post.stage === slug);
  const path = `/etapas/${slug}`;
  const faq = etapa.faq
    .map((item) => ({ q: item.pregunta, a: item.respuesta }))
    .filter((item) => publicCopy(item.q) && publicCopy(item.a));

  return (
    <>
      <section className="sec etapa etapa-hero">
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Etapas de vida", path: "/etapas" },
              { name: etapa.nombre, path },
            ]}
          />
          <JsonLd data={webPageJsonLd({ name: etapa.nombre, description: etapa.meta_description, path })} />
          <JsonLd data={faqJsonLd(faq)} />
          <JsonLd
            data={itemListJsonLd(
              etapa.nombre,
              path,
              etapa.categorias_relacionadas.map((item) => ({
                name: getCategoria(item)?.nombre ?? item,
                path: `/categorias/${item}`,
              })),
            )}
          />
          <div className="ch-grid" style={{ marginTop: 18 }}>
            <div className="etapa-copy">
              <div className="etapa-lead">
                <div className="kicker">Etapa de vida</div>
                <h1 className="h1" style={{ marginTop: 12 }}>{etapa.nombre}</h1>
                <p className="lede" style={{ marginTop: 16 }}>{etapa.descripcion}</p>
              </div>
              <div className="etapa-rest">
                <div className="etapa-intro">
                  {etapa.intro.map((paragraph) => (
                    <p key={paragraph}>
                      <Editorial text={paragraph} />
                      {paragraph === etapa.intro[etapa.intro.length - 1] && etapa.intro_fuentes ? (
                        <Fuentes ids={etapa.intro_fuentes} />
                      ) : null}
                    </p>
                  ))}
                </div>
                <p className="etapa-note">
                  <Editorial text={etapa.aviso_profesional} />
                </p>
              </div>
            </div>
            <div className="etapa-side">
              <Photo file={photo} className="ch-media etapa-photo" priority sizes="(max-width: 600px) 100vw, 40vw" credit />
              <nav className="etapa-index" aria-label="En esta página">
                <div className="kicker">En esta página</div>
                <ol>
                  {INDEX.map((item, index) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>
                        <span className="num">{pad2(index + 1)}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
          <div id="enfoque" style={{ marginTop: 56 }}>
            <div className="kicker">Lo esencial</div>
            <ol className="cindex" style={{ marginTop: 16 }}>
              {etapa.enfoque_editorial.map((item, index) => (
                <li key={item} style={{ padding: "16px 0", display: "grid", gridTemplateColumns: "34px minmax(0, 1fr)", gap: 12 }}>
                  <span className="num">{pad2(index + 1)}</span>
                  <span>
                    <Editorial text={item} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Band id="prioridades" kicker="Qué priorizar" title="Prioridades" surface>
        <div className="prio">
          {etapa.prioridades.map((item, index) => (
            <article key={item.titulo}>
              <span className="num">{pad2(index + 1)}</span>
              <div>
                <div className="kicker">{TIPO[item.tipo]}</div>
                <h3 className="h3" style={{ marginTop: 8 }}>{item.titulo}</h3>
                <p style={{ margin: "8px 0 0", color: "var(--ink-2)" }}>
                  <Editorial text={item.texto} />
                  <Fuentes ids={item.fuentes} />
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
                  <EvidencePill level={item.nivel_evidencia} />
                  {publicCopy(item.respaldo) ? (
                    <span className="small">
                      <Editorial text={item.respaldo} />
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Band>

      <Band id="nutrientes" kicker="Comida primero" title="Nutrientes a vigilar">
        <div className="nut-grid">
          {etapa.nutrientes_a_vigilar.map((item) => (
            <article className="nut-card" key={item.nutriente}>
              <h3 className="h4">{item.nutriente}</h3>
              <p>
                <Editorial text={item.por_que} />
                <Fuentes ids={item.fuentes} />
              </p>
              <p>
                <Editorial text={item.como_cubrirlo} />
              </p>
              {item.enlace ? (
                <Link className="link" href={item.enlace}>
                  Ver más <IconArrow />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Band>

      <Band id="suplementos" kicker="Tres grupos" title="Suplementos" surface>
        <div className="supl-groups">
          {GRUPOS.map((group) => (
            <div className={`supl-group ${group.className}`} key={group.key}>
              <h3 className="h3">{group.title}</h3>
              <div className="supl-list">
                {etapa.suplementos[group.key].map((item) => (
                  <article className="supl-item" key={item.nombre}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                      <h3 className="h4">{item.nombre}</h3>
                      <EvidencePill level={item.nivel_evidencia} />
                    </div>
                    <p>
                      <Editorial text={item.texto} />
                      <Fuentes ids={item.fuentes} />
                    </p>
                    <Link className="link" href={item.enlace}>
                      Ver más <IconArrow />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Band>

      <Band id="errores" kicker="Qué suele fallar" title="Errores comunes">
        <div className="err-grid">
          {etapa.errores_comunes.map((item, index) => (
            <article className="err" key={item.titulo}>
              <span className="num">{pad2(index + 1)}</span>
              <h3 className="h4" style={{ marginTop: 10 }}>{item.titulo}</h3>
              <p>
                <Editorial text={item.texto} />
              </p>
            </article>
          ))}
        </div>
      </Band>

      <Band
        id="semana"
        kicker="Siete días"
        title="Semana tipo"
        surface
        lede={<Editorial text={etapa.semana_tipo.bajada} />}
      >
        <div className="week">
          <div className="week-head xs">
            <span>Día</span>
            <span>Entrenamiento</span>
            <span>Hábitos</span>
          </div>
          {etapa.semana_tipo.dias.map((dia) => (
            <article key={dia.dia}>
              <b>{dia.dia}</b>
              <p>
                <span className="xs m-only">Entrenamiento</span>
                <Editorial text={dia.entrenamiento} />
              </p>
              <p>
                <span className="xs m-only">Hábitos</span>
                <Editorial text={dia.habitos} />
              </p>
            </article>
          ))}
        </div>
      </Band>

      <Band id="faq" kicker="Dudas habituales" title="Preguntas frecuentes">
        <div style={{ marginTop: 12 }}>
          <FaqList items={faq} />
        </div>
      </Band>

      <Band id="leer" kicker="Seguí leyendo" title="Para profundizar" surface>
        <div className="etapa-links">
          {etapa.enlaces_internos.map((item) => (
            <Link key={item.href} className="link" href={item.href}>
              {item.texto} <IconArrow />
            </Link>
          ))}
        </div>
        <div className="kicker" style={{ marginTop: 36 }}>Categorías relacionadas</div>
        <div className="cat-stack">
          {etapa.categorias_relacionadas.map((item) => {
            const categoria = getCategoria(item);
            if (!categoria) return null;
            return (
              <Link className="cchip" href={`/categorias/${item}`} key={item} style={{ justifyContent: "space-between", width: "fit-content", maxWidth: "100%" }}>
                <span>{categoria.nombre}</span>
                <EvidencePill level={categoria.nivel_evidencia} />
              </Link>
            );
          })}
        </div>
        {posts.length > 0 ? (
          <div style={{ marginTop: 36 }}>
            <div className="kicker">Guías</div>
            <div className="mpg" style={{ marginTop: 16 }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <h3 className="h3" style={{ marginTop: 10 }}>{post.title}</h3>
                  <span className="link" style={{ marginTop: 12 }}>
                    Leer <IconArrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Band>

      <section id="fuentes" className="sec etapa">
        <div className="wrap">
          <div className="srcbox">
            <div className="kicker">Fuentes</div>
            <ol>
              {etapa.fuentes_detalle.map((fuente) => (
                <li key={fuente.n} id={`fuente-${fuente.n}`}>
                  <span className="num">{pad2(fuente.n)}</span>
                  <a href={fuente.url} target="_blank" rel="noreferrer">
                    {fuente.titulo}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
