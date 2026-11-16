import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBrowser } from "@/components/categoria/category-browser";
import { Crumbs } from "@/components/ui/crumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { getAffiliateProvider } from "@/lib/affiliates";
import { getCategoria, getCategorias, getEtapas, getMarcas, loadTaxonomia } from "@/lib/content/load";
import { EVIDENCE, hostOf, isHttpUrl, pad2 } from "@/lib/format";
import { CATEGORY_FEATURE_PHOTOS, LINE_PHOTOS } from "@/lib/photos";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCategorias().map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) return {};
  return pageMetadata({
    title: categoria.nombre,
    description: categoria.descripcion,
    path: `/categorias/${slug}`,
  });
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) notFound();
  const tax = loadTaxonomia();
  const marcas = getMarcas();
  const marcaName = new Map(marcas.map((item) => [item.slug, item.nombre]));
  const products = getAffiliateProvider().getProductsByCategory(slug);
  const meta = EVIDENCE[categoria.nivel_evidencia];
  const index = getCategorias().findIndex((item) => item.slug === slug);
  const photo = CATEGORY_FEATURE_PHOTOS[slug] ?? LINE_PHOTOS[index % LINE_PHOTOS.length] ?? "tarro-scoop.jpg";

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          categoria.nombre,
          `/categorias/${slug}`,
          products.map((product) => ({ name: `${product.marcaNombre} · ${product.titulo}`, path: `/marcas/${product.marcaSlug}` })),
        )}
      />
      <section className="sec-sm" style={{ paddingBottom: 20 }}>
        <div className="wrap">
          <Crumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Categorías", path: "/categorias" },
              { name: categoria.nombre, path: `/categorias/${slug}` },
            ]}
          />
          <div className="ch-grid" style={{ marginTop: 12 }}>
            <div>
              <div className="kicker">
                <span className="num">{pad2(index + 1)}</span> de {getCategorias().length}
              </div>
              <h1 className="h1" style={{ marginTop: 12 }}>{categoria.nombre}</h1>
              <p className="lede" style={{ marginTop: 16 }}>{categoria.descripcion}</p>
              <div className="evbox">
                <div className="evb-l">
                  {meta.grade ? <span className={`grade ${meta.gradeClass}`} style={{ width: 54, height: 54, fontSize: 26 }}>{meta.grade}</span> : <span className="num">·</span>}
                  <div>
                    <b className="serif" style={{ fontSize: 22 }}>Evidencia {meta.label.toLowerCase()}</b>
                    <p className="xs" style={{ marginTop: 4 }}>{meta.grade ? `AIS Grupo ${meta.grade}` : "Se evalúa por subcategoría"}</p>
                  </div>
                </div>
                <p className="small" style={{ margin: 0 }}>{categoria.nota_evidencia}</p>
              </div>
              <p className="xs" style={{ marginTop: 14 }}>{tax.nota_evidencia}</p>
            </div>
            <Photo file={photo} className="ch-media" priority sizes="(max-width: 600px) 100vw, 40vw" tag="Imagen ilustrativa" alt="" />
          </div>
        </div>
      </section>
      <section className="sec-sm" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CategoryBrowser
            products={products}
            subcategorias={categoria.subcategorias.map((item) => ({ slug: item.slug, nombre: item.nombre }))}
            marcas={categoria.marcas.map((item) => ({ slug: item, nombre: marcaName.get(item) ?? item }))}
            etapas={getEtapas().map((item) => ({ slug: item.slug, nombre: item.nombre }))}
            niveles={tax.niveles_de_usuario.map((item) => ({ slug: item.slug, nombre: item.nombre }))}
            showGuide={slug === "proteinas"}
          />
          <div className="rgrid" style={{ marginTop: 56 }}>
            <div>
              <div className="kicker">Subcategorías</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 8 }}>
                {categoria.subcategorias.map((item) => (
                  <li key={item.slug}>
                    <span className="serif" style={{ fontSize: 20 }}>{item.nombre}</span>
                  </li>
                ))}
              </ul>
              <p className="xs" style={{ marginTop: 12 }}>
                Las subcategorías filtran el listado de arriba. Todavía no tienen página propia.
              </p>
            </div>
            <div>
              <div className="kicker">Marcas en esta categoría</div>
              <div className="cats-chips">
                {categoria.marcas.map((item) => (
                  <Link className="cchip" href={`/marcas/${item}`} key={item}>
                    {marcaName.get(item) ?? item}
                  </Link>
                ))}
              </div>
              <div className="srcbox" style={{ marginTop: 22 }}>
                <div className="kicker">Fuentes del nivel</div>
                <ol>
                  {categoria.fuentes.map((fuente, fuenteIndex) => (
                    <li key={fuente}>
                      <span className="num">{pad2(fuenteIndex + 1)}</span>
                      <span>
                        {isHttpUrl(fuente) ? (
                          <a href={fuente} target="_blank" rel="noreferrer">{hostOf(fuente)}</a>
                        ) : (
                          fuente
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
