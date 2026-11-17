import Link from "next/link";
import { AffiliateNotice } from "@/components/ui/affiliate-notice";
import { blockHasAffiliate } from "@/lib/affiliates";
import { MICROCOPY } from "@/lib/microcopy";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Editorial } from "@/components/ui/editorial";
import { FaqList } from "@/components/ui/faq-list";
import { IconArrow } from "@/components/ui/icons";
import { MlGrid } from "@/components/ui/ml-card";
import { Photo } from "@/components/ui/photo";
import { getAffiliateProvider } from "@/lib/affiliates";
import { getCategorias, getEtapas, getFichas, getMarcas, getPublishedPosts, loadHome, loadTaxonomia } from "@/lib/content/load";
import { EVIDENCE, applyPlaceholders, formatContentDate, initials, pad2, shortOrigin } from "@/lib/format";
import { CATEGORY_FEATURE_PHOTOS, STAGE_PHOTOS, photoByFile } from "@/lib/photos";

const FEATURED_CATEGORIES = ["proteinas", "creatina", "omega-3"];
const EVIDENCE_SAMPLE = ["proteinas", "creatina", "colageno", "magnesio"];
const STANDARDS = [
  ["01", "Nivel de evidencia", "Cada categoría lleva un nivel general según AIS (Grupos A–D) y las posturas de la ISSN."],
  ["02", "Registros con fuente", "RNE consultado en la base oficial SIFeGA cuando fue posible, con fecha de consulta."],
  ["03", "Verificado ≠ declarado", "Distinguimos lo consultado en registros oficiales de lo que declara cada marca."],
  ["04", "Sin claims médicos", "Contenido informativo. Nada reemplaza la consulta profesional."],
];

const WORK_LINKS: Record<string, string> = {
  "Nivel de evidencia": "/como-evaluamos",
  "Regulación argentina": "/blog/rotulo-suplemento-rnpa-rne",
};

const HERO = photoByFile("hero-mujer.jpg");
const HERO_BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function splitTitle(title: string): { lead: string; emphasis?: string } {
  const marker = "explicados con evidencia";
  const index = title.toLowerCase().indexOf(marker);
  if (index === -1) return { lead: title };
  return { lead: title.slice(0, index), emphasis: title.slice(index) };
}

export function HomeView() {
  const home = loadHome();
  const categorias = getCategorias();
  const etapas = getEtapas();
  const fichas = getFichas();
  const marcas = getMarcas();
  const posts = getPublishedPosts();
  const featured = getAffiliateProvider().getFeatured(4);
  const title = applyPlaceholders(home.h1);
  const { lead, emphasis } = splitTitle(title);
  const bySlug = new Map(categorias.map((item) => [item.slug, item]));
  const fichaBySlug = new Map(fichas.map((item) => [item.slug, item]));

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <section className="mhero">
        <div className="wrap">
          <link rel="preload" as="image" href="/img/hero-mujer-750.avif" type="image/avif" media="(max-width: 600px)" fetchPriority="high" />
          <div className="ph ph-lcp mh-img">
            <picture>
              <source media="(min-width: 601px)" srcSet="/img/blank.gif" type="image/gif" />
              <img
                src="/img/hero-mujer-750.avif"
                alt={HERO.alt}
                width={750}
                height={1126}
                fetchPriority="high"
                decoding="sync"
                sizes="100vw"
                style={{ objectPosition: "50% 18%" }}
              />
            </picture>
            <div className="mh-ov">
              <div className="kicker light">Nº 01 · Guía independiente · Argentina</div>
              <p className="h-display" aria-hidden="true" style={{ color: "#fff", marginTop: 12, marginBottom: 0 }}>
                {lead}
                {emphasis ? <em>{emphasis}</em> : null}
              </p>
              <Link className="link" href="/categorias" style={{ color: "#f0e8d8", marginTop: 14 }}>
                Explorar categorías <IconArrow />
              </Link>
            </div>
          </div>
          <p className="lede" style={{ marginTop: 12, fontSize: 15.5 }}>
            <Editorial text={home.bajada} />
          </p>
        </div>
      </section>
      <section className="hero d-only">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="kicker" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="num" style={{ fontSize: 15 }}>Nº 01</span>
              <span style={{ width: 26, height: 1, background: "var(--brass)" }} />
              Guía independiente · Argentina
            </div>
            <p className="h-display" aria-hidden="true" style={{ marginTop: 22, marginBottom: 0 }}>
              {lead}
              {emphasis ? <em>{emphasis}</em> : null}
            </p>
            <p className="lede" style={{ marginTop: 20, maxWidth: 540 }}>
              <Editorial text={home.bajada} />
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 28, alignItems: "center", flexWrap: "wrap" }}>
              <Link className="btn btn-primary" href="/categorias">
                Explorar categorías <IconArrow />
              </Link>
              <Link className="btn btn-ghost" href="/etapas">
                Elegir mi etapa de vida
              </Link>
            </div>
            <div className="hero-src">
              <span className="xs" style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                Marco de evidencia
              </span>
              <a className="srcchip" href="https://www.ausport.gov.au/ais/nutrition/supplements" target="_blank" rel="noreferrer">
                AIS · Grupos A–D
              </a>
              <a className="srcchip" href="https://www.sportsnutritionsociety.org/" target="_blank" rel="noreferrer">
                ISSN · Position stands
              </a>
              <a className="srcchip" href="https://www.boletinoficial.gob.ar/detalleAviso/primera/345309/20260803" target="_blank" rel="noreferrer">
                SENASA · CAA
              </a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <link rel="preload" as="image" href="/img/hero-mujer-1280.avif" type="image/avif" media="(min-width: 601px)" fetchPriority="high" />
            <div className="ph ph-lcp hero-media">
              <picture>
                <source media="(min-width: 601px)" srcSet="/img/hero-mujer-1280.avif" type="image/avif" />
                <img
                  src={HERO_BLANK}
                  alt={HERO.alt}
                  width={1280}
                  height={1920}
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 1100px) 90vw, 640px"
                  style={{ objectPosition: "50% 22%" }}
                />
              </picture>
              <span className="ph-tag" style={{ left: 16, top: 16 }}>Etapa 50 a 60</span>
              <span className="credit">{HERO.credit}</span>
            </div>
            <aside className="evcard" aria-label="Evidencia por categoría">
              <div className="kicker" style={{ fontSize: 10.5 }}>Evidencia por categoría</div>
              {EVIDENCE_SAMPLE.map((slug) => {
                const categoria = bySlug.get(slug);
                if (!categoria) return null;
                const meta = EVIDENCE[categoria.nivel_evidencia];
                return (
                  <div className="evrow" key={slug}>
                    <span>{categoria.nombre}</span>
                    {meta.grade ? <span className={`grade ${meta.gradeClass}`} style={{ width: 24, height: 24, fontSize: 13 }}>{meta.grade}</span> : <span className="xs">{meta.label}</span>}
                  </div>
                );
              })}
            </aside>
          </div>
        </div>
      </section>

      <section className="mlsec" aria-labelledby="destacados-ml">
        <div className="wrap">
          <div className="mlhead">
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span className="num" style={{ fontSize: 15 }}>Nº 02</span>
              <h2 id="destacados-ml" className="h3">
                Destacados en <em className="it" style={{ color: "var(--forest-3)" }}>Mercado Libre</em>
              </h2>
              <span className="xs">Publicaciones de Mercado Libre. El precio lo ves en cada publicación.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="xs">Selección editorial</span>
              <Link className="link" href="/categorias">
                Ver todos <IconArrow />
              </Link>
            </div>
          </div>
          <MlGrid products={featured} />
          <AffiliateNotice text={MICROCOPY.bloqueListado} show={blockHasAffiliate(featured)} />
        </div>
      </section>

      <section className="std">
        <div className="wrap">
          <div className="std-grid">
            <div className="std-intro">
              <div className="kicker light">Nuestros estándares</div>
              <h2 className="h2" style={{ color: "var(--paper)", marginTop: 18 }}>
                Confianza que se puede <em style={{ color: "var(--brass)" }}>rastrear</em>
              </h2>
              <p style={{ marginTop: 18, color: "#c9c3b5", fontSize: 16.5, maxWidth: 380 }}>
                El orden de las marcas responde a un criterio editorial explícito, no a un ranking de calidad ni a quién paga.
              </p>
              <Link className="link" href="/como-evaluamos" style={{ color: "var(--paper)", marginTop: 26 }}>
                Cómo evaluamos <IconArrow />
              </Link>
            </div>
            <div className="std-items">
              {STANDARDS.map(([n, titleItem, text]) => (
                <div className="std-it" key={n}>
                  <span className="std-n">{n}</span>
                  <h3 className="h4" style={{ color: "var(--paper)", margin: 0 }}>{titleItem}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="ph std-ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/capsulas-estandar.jpg"
                alt={photoByFile("capsulas-estandar.jpg").alt}
                width={1240}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="como-trabajamos">
        <div className="wrap">
          <div className="kicker"><span className="num">Nº 03</span></div>
          <h2 id="como-trabajamos" className="h2" style={{ marginTop: 14 }}>{home.como_trabajamos.titulo}</h2>
          <p className="lede" style={{ maxWidth: 640, marginTop: 16 }}>
            <Editorial text={home.como_trabajamos.bajada} />
          </p>
          <div className="work-grid">
            {home.como_trabajamos.puntos.map((punto, index) => {
              const href = WORK_LINKS[punto.titulo];
              return (
                <article className="work-point" key={punto.titulo}>
                  <span className="work-n">{pad2(index + 1)}</span>
                  <h3>{punto.titulo}</h3>
                  <p>{punto.texto}</p>
                  {href ? (
                    <Link className="work-more" href={href}>Ver más</Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" id="marcas">
        <div className="wrap">
          <div className="sec-head">
            <div className="lead-col">
              <div className="kicker"><span className="num">Nº 04</span> Marcas</div>
              <h2 className="h2">{home.bloque_marcas.titulo}</h2>
              <p className="lede" style={{ marginTop: 16, fontSize: 18 }}>
                <Editorial text={home.bloque_marcas.texto} />
              </p>
            </div>
            <Link className="link" href="/marcas">
              Ver las {marcas.length} marcas <IconArrow />
            </Link>
          </div>
          <div className="bgrid">
            {home.bloque_marcas.items.map((item, index) => {
              const ficha = fichaBySlug.get(item.slug);
              const marca = marcas.find((entry) => entry.slug === item.slug);
              return (
                <Link className="bcard" href={`/marcas/${item.slug}`} key={item.slug}>
                  <div className="lbox">
                    <BrandLogo slug={item.slug} name={item.nombre} variant="card" />
                    <span className="bn">{pad2(index + 1)}</span>
                  </div>
                  <div>
                    <div className="h4" style={{ fontSize: 19 }}>{item.nombre}</div>
                    <div className="xs" style={{ letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                      {marca ? shortOrigin(String(marca.origen.valor)) : null}
                    </div>
                  </div>
                  <p className="bintro">{ficha?.intro ?? item.resumen}</p>
                  <span className="link" style={{ fontSize: 13.5 }}>
                    Ver ficha <IconArrow />
                  </span>
                </Link>
              );
            })}
            <article className="bcard bnote">
              <div className="kicker">Criterio del orden</div>
              <p className="serif it" style={{ fontSize: 21, lineHeight: 1.35, marginTop: 14, color: "var(--forest)" }}>
                “El orden responde a un criterio editorial explícito (trayectoria, escala, presencia oficial e información verificable), no a un ranking de calidad.”
              </p>
              <Link className="link" href="/como-evaluamos#orden" style={{ marginTop: 18 }}>
                Leer la metodología <IconArrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="lead-col">
              <div className="kicker"><span className="num">Nº 05</span> Categorías</div>
              <h2 className="h2">
                {categorias.length} categorías, <em>cada una con su nivel de evidencia</em>
              </h2>
            </div>
            <Link className="link" href="/como-evaluamos">
              Cómo leer los niveles <IconArrow />
            </Link>
          </div>
          <div className="cat-grid">
            <div className="cfeat">
              {FEATURED_CATEGORIES.map((slug, index) => {
                const categoria = bySlug.get(slug);
                const file = CATEGORY_FEATURE_PHOTOS[slug];
                if (!categoria || !file) return null;
                const meta = EVIDENCE[categoria.nivel_evidencia];
                return (
                  <Link href={`/categorias/${slug}`} key={slug} style={{ textDecoration: "none" }}>
                    <Photo
                      file={file}
                      className="feat-ph"
                      sizes="(max-width: 600px) 46vw, 240px"
                      tag={meta.grade ? `${meta.grade} · Evidencia ${meta.label.toLowerCase()}` : meta.label}
                    />
                    <div style={{ paddingTop: 16 }}>
                      <div className="num">{pad2(index + 1)}</div>
                      <h3 className="h3" style={{ margin: "8px 0 0" }}>{categoria.nombre}</h3>
                      <p className="small" style={{ marginTop: 8 }}>{categoria.descripcion}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>Índice</div>
              <ol className="cindex">
                {categorias.map((categoria, index) => {
                  const meta = EVIDENCE[categoria.nivel_evidencia];
                  return (
                    <li key={categoria.slug}>
                      <Link href={`/categorias/${categoria.slug}`}>
                        <span className="num">{pad2(index + 1)}</span>
                        <span>{categoria.nombre}</span>
                        <span className="xs d-only">{categoria.subcategorias.length} subcat.</span>
                        <span className={`pill ev ${meta.chip}`}>
                          <span className="dot" />
                          {meta.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="lead-col">
              <div className="kicker"><span className="num">Nº 06</span> Etapas de vida</div>
              <h2 className="h2">
                Suplementación <em>según tu etapa de vida</em>
              </h2>
              <p className="lede" style={{ marginTop: 16, fontSize: 18 }}>
                <Editorial text={home.bloque_etapas.texto} />
              </p>
            </div>
          </div>
          <div className="egrid">
            {etapas.slice(0, 3).map((etapa, index) => {
              const file = STAGE_PHOTOS[etapa.slug];
              if (!file) return null;
              const related = etapa.categorias_relacionadas.slice(0, 3).map((slug) => bySlug.get(slug)?.nombre).filter(Boolean);
              return (
                <Link className="ecard" href={`/etapas/${etapa.slug}`} key={etapa.slug}>
                  <Photo file={file} className="ecard" sizes="(max-width: 600px) 100vw, 30vw" position={index === 0 ? "72% 30%" : "50% 30%"} />
                  <div className="eov">
                    <div className="num" style={{ color: "var(--brass)" }}>{pad2(index + 1)}</div>
                    <h3 className="h-et">{etapa.nombre}</h3>
                    <p style={{ fontSize: 14.5, marginTop: 10 }}>{etapa.descripcion}</p>
                    <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                      {related.map((name) => (
                        <span key={name} style={{ font: "600 11.5px/1 var(--sans)", padding: "7px 10px", borderRadius: 999, border: "1px solid rgb(196 165 116 / 0.6)", color: "#f0e7d4" }}>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="etiles">
            {etapas.slice(3).map((etapa, index) => (
              <Link className="etile" href={`/etapas/${etapa.slug}`} key={etapa.slug}>
                <div className="num">{pad2(index + 4)}</div>
                <h3 className="h4" style={{ marginTop: 8 }}>{etapa.nombre}</h3>
                <p className="small" style={{ marginTop: 8, flex: 1 }}>{etapa.descripcion}</p>
                <span className="link" style={{ fontSize: 13.5, marginTop: 14 }}>
                  Ver etapa <IconArrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EvidenceBand />

      <section className="sec" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="lead-col">
              <div className="kicker"><span className="num">Nº 08</span> Guías</div>
              <h2 className="h2">
                Lecturas con <em>byline y fuentes</em>
              </h2>
            </div>
            <Link className="link" href="/blog">
              Todas las guías <IconArrow />
            </Link>
          </div>
          <div className="pgrid">
            {posts.map((post, index) => (
              <Link className="pcard" href={`/blog/${post.slug}`} key={post.slug}>
                {post.image ? (
                  <Photo file={post.image} className="guide-ph" sizes={index === 0 ? "(max-width: 600px) 100vw, 50vw" : "30vw"} />
                ) : (
                  <div className="guide-fallback" aria-hidden>
                    <span className="kicker">Guía</span>
                  </div>
                )}
                <div style={{ paddingTop: 16 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span className="xs">{post.readingMinutes ? `${post.readingMinutes} min de lectura` : formatContentDate(post.date)}</span>
                    {post.evidence ? (
                      <span className="xs">
                        · Evidencia <b style={{ color: "var(--forest)" }}>{EVIDENCE[post.evidence].grade ?? EVIDENCE[post.evidence].label}</b>
                      </span>
                    ) : null}
                  </div>
                  <h3 className={index === 0 ? "h2" : "h3"} style={{ marginTop: 12, fontSize: index === 0 ? 32 : 22 }}>
                    {post.h1}
                  </h3>
                  <div className="byl">
                    <span className="av">{initials(post.author)}</span>
                    <span className="xs">
                      Por <b style={{ color: "var(--ink)" }}>{post.author}</b>
                      {post.reviewer ? <> · Revisión: <Editorial text={post.reviewer} verbatim /></> : null}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap faqgrid">
          <div>
            <div className="kicker"><span className="num">Nº 09</span> Preguntas frecuentes</div>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Lo que más <em>nos preguntan</em>
            </h2>
            <p className="small" style={{ marginTop: 16, maxWidth: 320 }}>
              Respuestas cortas, con su fuente enlazada. Para tu caso puntual, consultá a un profesional.
            </p>
          </div>
          <FaqList items={home.faq} />
        </div>
      </section>
      <section className="fuentes-portada">
        <div className="wrap">
          <div className="kicker">Fuentes</div>
          <ul>
            {home.fuentes_portada.map((fuente) => (
              <li key={fuente.url}>
                <a href={fuente.url} target="_blank" rel="noreferrer">{fuente.nombre}</a>
              </li>
            ))}
          </ul>
          <p className="xs" style={{ marginTop: 16 }}>
            <Editorial text={home.disclaimer} />
          </p>
        </div>
      </section>
    </>
  );
}

function EvidenceBand() {
  const tax = loadTaxonomia();
  const levels = [
    ["A", "g-A", "Alta", tax.niveles_de_evidencia.alto],
    ["B", "g-B", "Moderada", tax.niveles_de_evidencia.moderado],
    ["C", "g-C", "Baja", tax.niveles_de_evidencia.bajo],
    ["D", "g-D", "Precaución", tax.niveles_de_evidencia.precaucion],
  ] as const;
  return (
    <section className="evband">
      <div className="wrap evgrid">
        <Photo file="mano-capsula.jpg" className="evph" sizes="(max-width: 600px) 100vw, 46vw" position="55% 50%" credit />
        <div style={{ padding: "72px 0" }}>
          <div className="kicker"><span className="num" style={{ marginRight: 12 }}>Nº 07</span>Cómo evaluamos</div>
          <h2 className="h2" style={{ marginTop: 18 }}>
            Cuatro grados, <em>una sola regla:</em> mostrar la fuente
          </h2>
          <p className="lede" style={{ marginTop: 16, fontSize: 17.5 }}><Editorial text={tax.nota_evidencia} /></p>
          <div style={{ marginTop: 24, borderTop: "1px solid var(--line)" }}>
            {levels.map(([grade, gradeClass, label, text]) => (
              <div className="srow" key={grade}>
                <span className={`grade ${gradeClass}`}>{grade}</span>
                <div>
                  <b className="serif" style={{ fontSize: 18 }}>{label}</b>
                  <p className="small"><Editorial text={text} /></p>
                </div>
              </div>
            ))}
          </div>
          <p className="xs" style={{ marginTop: 14 }}>“Variable”: <Editorial text={tax.niveles_de_evidencia.variable} /></p>
        </div>
      </div>
    </section>
  );
}
