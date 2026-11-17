import Link from "next/link";
import { AffiliateNotice } from "@/components/ui/affiliate-notice";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { FaqList } from "@/components/ui/faq-list";
import { IconArrow, IconCheck, IconInfo, IconOut } from "@/components/ui/icons";
import { MlGrid } from "@/components/ui/ml-card";
import { Photo } from "@/components/ui/photo";
import { blockHasAffiliate, getAffiliateProvider } from "@/lib/affiliates";
import { MICROCOPY } from "@/lib/microcopy";
import { getFicha, getMarcas, loadFichasFile, loadTaxonomia } from "@/lib/content/load";
import {
  CERT_LABEL,
  EVIDENCE,
  cx,
  hostOf,
  isHttpUrl,
  pad2,
  pathOf,
  publishedCopy,
  publicCopy,
  publicYear,
  sentences,
  splitLabeledUrl,
  type CertState,
} from "@/lib/format";
import { LINE_PHOTOS } from "@/lib/photos";
import { notFound } from "next/navigation";

const STATUS_CLASS: Record<CertState, string> = {
  verificado: "st-ver",
  declarado: "st-dec",
  documento: "st-doc",
  terceros: "st-ter",
  inferencia: "st-inf",
  rotulo: "st-rot",
  sin_dato: "st-sin",
};

export function BrandView({ slug }: { slug: string }) {
  const ficha = getFicha(slug);
  const marca = getMarcas().find((item) => item.slug === slug);
  if (!ficha || !marca) notFound();
  const all = getMarcas();
  const tax = loadTaxonomia();
  const updated = loadFichasFile().actualizado;
  const products = getAffiliateProvider().getProductsByBrand(slug);
  const yearNumber = publicYear(ficha.anio_fundacion);
  const yearText = publicCopy(String(ficha.anio_fundacion));
  const empresa = ficha.empresa ? publicCopy(ficha.empresa) : null;
  const index = all.findIndex((item) => item.slug === slug);
  const related = all.filter((item) => item.slug !== slug).slice(index, index + 4);
  const relatedBrands = related.length < 4 ? [...related, ...all.filter((item) => item.slug !== slug && !related.includes(item))].slice(0, 4) : related;
  const percentSentence = sentences(`${ficha.intro} ${ficha.posicionamiento}`).find((item) => item.includes("%"));
  const percent = percentSentence?.match(/(\d+)\s*%/)?.[1];
  const catBySlug = new Map(tax.categorias.map((item) => [item.slug, item]));
  const socials = Object.entries(ficha.redes).filter(([key]) => key.toLowerCase() !== "nota");
  const note = ficha.redes.Nota;
  const channels = [
    splitLabeledUrl(ficha.donde_comprar.sitio_oficial.startsWith("http") ? `Sitio oficial: ${ficha.donde_comprar.sitio_oficial}` : ficha.donde_comprar.sitio_oficial),
    isHttpUrl(ficha.donde_comprar.mercado_libre)
      ? splitLabeledUrl(`Mercado Libre: ${ficha.donde_comprar.mercado_libre}`)
      : { label: "Mercado Libre", href: undefined as string | undefined },
    ...ficha.donde_comprar.otras.map((item) => splitLabeledUrl(item)),
  ];

  return (
    <>
      <div className="wrap">
        <Crumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Marcas", path: "/marcas" },
            { name: ficha.schema_sugerido.name, path: `/marcas/${slug}` },
          ]}
        />
      </div>
      <section className="bhero">
        <div className="wrap bh-grid">
          <div className="bh-copy">
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <span className="num" style={{ fontSize: 15 }}>
                Marca Nº {pad2(marca.ranking_relevancia)} de {all.length}
              </span>
              <span className="kicker">{shortCountry(ficha.origen)}</span>
            </div>
            <div className="bh-logo">
              <BrandLogo slug={slug} name={marca.nombre} variant="hero" />
              <span className="xs" style={{ position: "absolute", right: 16, bottom: 12 }}>
                {isHttpUrl(ficha.donde_comprar.sitio_oficial)
                  ? `Logo oficial · ${hostOf(ficha.donde_comprar.sitio_oficial)}`
                  : "Logo oficial"}
              </span>
            </div>
            <h1 className="h1" style={{ marginTop: 28 }}>
              <Editorial text={ficha.h1} />
            </h1>
            <p className="lede" style={{ marginTop: 16, maxWidth: 640 }}>
              <Editorial text={ficha.intro} />
            </p>
          </div>
          <div className="bh-media">
            <Photo file="polvo-scoop.jpg" className="duo-paper brand-still" sizes="40vw" position="50% 55%" tag="Imagen ilustrativa" />
            <div className="bh-quote">
              <div className="kicker">En números</div>
              {percent && percentSentence ? (
                <div className="bigstat">
                  <span className="statnum">
                  &gt;{percent}
                  <small style={{ fontSize: 34 }}>%</small>
                </span>
                  <p style={{ fontSize: 14, color: "#cfc9bb" }}>
                    <Editorial text={percentSentence} />
                  </p>
                </div>
              ) : (
                <div className="bigstat">
                  {yearNumber ? <span className="statnum" style={{ fontSize: 48 }}>{yearNumber}</span> : null}
                  {yearText ? (
                    <p style={{ fontSize: 14, color: "#cfc9bb" }}>
                      <Editorial text={String(ficha.anio_fundacion)} />
                    </p>
                  ) : null}
                </div>
              )}
              <div className="bigrow">
                {yearNumber ? (
                  <div>
                    <b>{yearNumber}</b>
                    <span className="xs">Fundación</span>
                  </div>
                ) : null}
                <div>
                  <b>{ficha.lineas.length}</b>
                  <span className="xs">Líneas</span>
                </div>
                <div>
                  <b>{ficha.categorias.length}</b>
                  <span className="xs">Categorías</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bh-products" id="productos">
            <div className="mlhead">
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span className="num">01</span>
                <h2 className="h3">
                  Productos de {marca.nombre} en <em className="it" style={{ color: "var(--forest-3)" }}>Mercado Libre</em>
                </h2>
              </div>
            </div>
            <MlGrid products={products} />
            {ficha.nota_productos ? (
              <p className="xs" style={{ marginTop: 14 }}>
                <Editorial text={ficha.nota_productos} />
              </p>
            ) : null}
            <AffiliateNotice text={MICROCOPY.fichaProductos} show={blockHasAffiliate(products)} />
          </div>
          <div className="bh-facts">
            <div className="facts">
              <div className="fact">
                <span className="xs">Origen</span>
                <b><Editorial text={ficha.origen} /></b>
              </div>
              {yearText ? (
                <div className="fact">
                  <span className="xs">Fundación</span>
                  <b>{yearText}</b>
                </div>
              ) : null}
              {empresa ? (
                <div className="fact">
                  <span className="xs">Empresa</span>
                  <b>{empresa}</b>
                </div>
              ) : null}
              {products.some((item) => item.tiendaOficial) ? (
                <div className="fact">
                  <span className="xs">{MICROCOPY.tiendaOficial}</span>
                  <b>En Mercado Libre</b>
                </div>
              ) : null}
            </div>
            <p className="xs" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <span className="st st-ver">
                <IconCheck /> Datos con fuente
              </span>
              <span>Actualizado {updated.split("-").reverse().join("/")}</span>
              <span>·</span>
              <span>{ficha.fuentes.length} fuentes</span>
            </p>
          </div>
        </div>
      </section>
      <div className="subnav">
        <div className="wrap">
          <nav className="sn" aria-label="Secciones de la ficha">
            {[
              ["01", "Productos en ML", "#productos"],
              ["02", "Resumen", "#resumen"],
              ["03", "Líneas", "#lineas"],
              ["04", "Canales oficiales", "#canales"],
              ["05", "Registros", "#registros"],
              ["06", "Historia", "#historia"],
              ["07", "Preguntas", "#preguntas"],
              ["08", "Fuentes", "#fuentes"],
            ].map(([n, label, href]) => (
              <a key={href} href={href}>
                <span className="num">{n}</span>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <section className="sec-sm" id="resumen">
        <div className="wrap rgrid">
          <div>
            <div className="kicker"><span className="num">02</span> Resumen</div>
            <p className="pull">“{sentences(ficha.posicionamiento)[0]}”</p>
          </div>
          <div>
            <p className="body-l">
              <Editorial text={ficha.posicionamiento} />
            </p>
            <div className="cats-chips">
              <span className="xs" style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                Compite en
              </span>
              {ficha.categorias.map((categoria) => {
                const full = catBySlug.get(categoria.slug);
                const level = full?.nivel_evidencia ?? "variable";
                return (
                  <Link className="cchip" href={`/categorias/${categoria.slug}`} key={categoria.slug}>
                    <span className={`dot ${EVIDENCE[level].chip}`} style={{ background: "currentColor" }} />
                    {categoria.nombre}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm" id="lineas">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker"><span className="num">03</span> Líneas de producto</div>
              <h2 className="h2">
                {ficha.lineas.length === 1 ? "Una línea documentada" : `${ficha.lineas.length} líneas en el catálogo`}
              </h2>
            </div>
          </div>
          <div className="lgrid">
            {ficha.lineas.map((linea, lineIndex) => {
              const parsed = /^(.*?)\s*\((.*)\)\s*$/.exec(linea);
              const name = parsed?.[1] ?? linea;
              const noteLine = parsed?.[2] ?? "";
              return (
                <article className="lcard" key={lineIndex}>
                  <Photo file={LINE_PHOTOS[lineIndex % LINE_PHOTOS.length] ?? "tarro-scoop.jpg"} className="lph" sizes="240px" tag={pad2(lineIndex + 1)} />
                  <div className="lbody">
                    <h3 className="h3" style={{ margin: "4px 0 0", fontSize: 24 }}>
                      <Editorial text={name} />
                    </h3>
                    {noteLine ? (
                      <p className="small" style={{ marginTop: 8 }}>
                        <Editorial text={noteLine} />
                      </p>
                    ) : null}
                    <Link className="link" href="#productos" style={{ marginTop: 14, fontSize: 13.5 }}>
                      Ver productos <IconArrow />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="chsec" id="canales">
        <div className="wrap chgrid">
          <div>
            <div className="kicker light"><span className="num" style={{ color: "var(--brass)" }}>04</span> Canales oficiales</div>
            <h2 className="h2" style={{ color: "var(--paper)", marginTop: 16 }}>
              Dónde comprar <em style={{ color: "var(--brass)" }}>directo a la marca</em>
            </h2>
            <p style={{ color: "#c3bdaf", marginTop: 16, maxWidth: 420 }}>
              Enlaces directos a los canales de {marca.nombre}. No son enlaces de afiliado y están separados de las recomendaciones de Mercado Libre.
            </p>
            {socials.length > 0 ? (
              <div style={{ marginTop: 28, display: "grid", gap: 8 }}>
                <span className="xs" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>Redes oficiales</span>
                {socials.map(([network, url]) =>
                  isHttpUrl(url) ? (
                    <a key={network} href={url} target="_blank" rel="noreferrer" style={{ color: "#d9d3c6" }}>
                      <b style={{ color: "var(--brass)", marginRight: 10 }}>{network}</b>
                      {hostOf(url)}
                      {pathOf(url) === "/" ? "" : pathOf(url)}
                    </a>
                  ) : (
                    <p key={network} className="xs">
                      <b style={{ color: "var(--brass)", marginRight: 10 }}>{network}</b>
                      <Editorial text={url} />
                    </p>
                  ),
                )}
                {note ? <p className="xs"><Editorial text={note} /></p> : null}
              </div>
            ) : null}
          </div>
          <div className="chlist">
            {channels.map((channel, channelIndex) => {
              const label = publicCopy(channel.label);
              if (!label || !channel.href) return null;
              const body = (
                <>
                  <span className="num" style={{ color: "var(--brass)" }}>{pad2(channelIndex + 1)}</span>
                  <span>
                    <b>{label}</b>
                    <span className="url">{hostOf(channel.href)}{pathOf(channel.href)}</span>
                  </span>
                  <span aria-hidden><IconOut /></span>
                </>
              );
              return channel.href ? (
                <a className={cx("chan", channelIndex === 0 && "plain")} href={channel.href} target="_blank" rel="noreferrer" key={`${channel.label}-${channelIndex}`}>
                  {body}
                </a>
              ) : (
                <div className="chan" key={`${channel.label}-${channelIndex}`}>{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-sm" id="registros">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker"><span className="num">05</span> Registros y certificaciones</div>
              <h2 className="h2">Qué está verificado <em>y qué no</em></h2>
            </div>
          </div>
          <div className="ctable">
            <table>
              <thead>
                <tr>
                  <th>Registro o certificación</th>
                  <th>Estado</th>
                  <th>Rótulo editorial</th>
                </tr>
              </thead>
              <tbody>
                {ficha.certificaciones_detalle.map((item, index) => {
                  const title = publishedCopy(item.texto);
                  if (!title) return null;
                  return (
                    <tr key={`${item.estado}-${index}`}>
                      <td>
                        <b className="serif">{title}</b>
                      </td>
                      <td>
                        <span className={`st ${STATUS_CLASS[item.estado]}`}>{CERT_LABEL[item.estado]}</span>
                      </td>
                      <td className="xs">{item.etiqueta}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginTop: 16 }}>
            <Editorial text={ficha.nota_registros} />
          </p>
          <div className="disclaimer" style={{ marginTop: 18 }}>
            <IconInfo />
            <p>
              <b>Antes de comprar:</b> revisá en el rótulo que figuren el RNPA del producto y el RNE del elaborador. Los dos números se pueden consultar en los buscadores públicos de SIFeGA (productos autorizados y establecimientos).
            </p>
          </div>
        </div>
      </section>

      <section className="sec-sm" id="historia" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap rgrid">
          <div>
            <div className="kicker"><span className="num">06</span> Historia</div>
            <h2 className="h2" style={{ marginTop: 16 }}>{marca.nombre}</h2>
            <p className="body-l" style={{ marginTop: 16 }}>
              <Editorial text={ficha.historia} />
            </p>
            {empresa ? (
              <p className="small" style={{ marginTop: 18 }}>
                <span className="xs">Empresa</span>
                <br />
                <b className="serif" style={{ fontSize: 20, color: "var(--ink)" }}>{empresa}</b>
              </p>
            ) : null}
            <p className="small">
              <Editorial text={String(ficha.anio_fundacion)} />
            </p>
          </div>
          <div className="timeline">
            {sentences(ficha.historia).map((sentence, sentenceIndex) => {
              const visible = publicCopy(sentence);
              if (!visible) return null;
              return (
                <div className="step" key={sentence}>
                  <span className="sdot" />
                  <div className="num" style={{ fontSize: 22 }}>{sentenceIndex === 0 && yearNumber ? yearNumber : pad2(sentenceIndex + 1)}</div>
                  <p className="small">{visible}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec-sm" id="preguntas">
        <div className="wrap fgrid">
          <div>
            <div className="kicker"><span className="num">07</span> Preguntas frecuentes</div>
            <FaqList items={ficha.faq} />
          </div>
          <aside className="srcbox" id="fuentes">
            <div className="kicker"><span className="num">08</span> Fuentes</div>
            <ol>
              {ficha.fuentes.map((fuente, fuenteIndex) => (
                <li key={fuente}>
                  <span className="num">{pad2(fuenteIndex + 1)}</span>
                  <span>
                    {isHttpUrl(fuente) ? (
                      <a href={fuente} target="_blank" rel="noreferrer">
                        {hostOf(fuente)}
                      </a>
                    ) : (
                      <Editorial text={fuente} />
                    )}
                  </span>
                </li>
              ))}
            </ol>
            <p className="xs" style={{ marginTop: 14 }}>
              <Editorial text={ficha.disclaimer} />
            </p>
          </aside>
        </div>
      </section>

      <section className="sec-sm" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker"><span className="num">09</span> Marcas relacionadas</div>
              <h2 className="h2">También en el orden editorial</h2>
            </div>
            <Link className="link" href="/marcas">
              Ver las {all.length} marcas <IconArrow />
            </Link>
          </div>
          <div className="rgrid4">
            {relatedBrands.map((item) => (
              <Link href={`/marcas/${item.slug}`} key={item.slug} style={{ textDecoration: "none" }}>
                <div className="lbox">
                  <BrandLogo slug={item.slug} name={item.nombre} variant="card" />
                  <span className="bn">{pad2(item.ranking_relevancia)}</span>
                </div>
                <b className="h4" style={{ display: "block", marginTop: 12 }}>{item.nombre}</b>
                <p className="small" style={{ marginTop: 6 }}>{getFicha(item.slug)?.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function shortCountry(origen: string): string {
  if (/estados unidos/i.test(origen)) return "EE. UU. · Importada";
  if (/argentina/i.test(origen)) return "Argentina · Nutrición deportiva";
  return "Nutrición deportiva";
}
