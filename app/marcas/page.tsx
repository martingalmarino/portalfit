import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Crumbs } from "@/components/ui/crumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { getFicha, getMarcas } from "@/lib/content/load";
import { pad2, shortOrigin } from "@/lib/format";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Marcas",
  description:
    "Las 14 marcas de suplementos y nutrición deportiva que sigue Portal FIT, en el orden editorial. Fichas con fuentes, sin ranking de calidad.",
  path: "/marcas",
});

export default function MarcasPage() {
  const marcas = getMarcas();
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Marcas", path: "/marcas" }]} />
        <JsonLd
          data={itemListJsonLd(
            "Marcas",
            "/marcas",
            marcas.map((marca) => ({ name: marca.nombre, path: `/marcas/${marca.slug}` })),
          )}
        />
        <div className="page-hero">
          <div className="kicker">Nº 03 · Orden editorial</div>
          <h1 className="h1">Las {marcas.length} marcas, con la misma vara</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 680 }}>
            El número es el lugar en el criterio editorial (trayectoria, escala, presencia oficial e información verificable). No es un ranking de calidad ni depende de quién paga.
          </p>
        </div>
        <div className="mgrid">
          {marcas.map((marca) => (
            <Link href={`/marcas/${marca.slug}`} key={marca.slug}>
              <div className="lbox">
                <BrandLogo slug={marca.slug} name={marca.nombre} variant="card" />
                <span className="bn">{pad2(marca.ranking_relevancia)}</span>
              </div>
              <b className="h4" style={{ display: "block", marginTop: 10, fontSize: 16 }}>{marca.nombre}</b>
              <span className="xs">{shortOrigin(String(marca.origen.valor))}</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 48, display: "grid", gap: 28 }}>
          {marcas.map((marca) => {
            const ficha = getFicha(marca.slug);
            return (
              <article key={marca.slug} className="erow" style={{ textDecoration: "none" }}>
                <span className="num">{pad2(marca.ranking_relevancia)}</span>
                <Link href={`/marcas/${marca.slug}`}>
                  <b className="serif" style={{ fontSize: 22 }}>{marca.nombre}</b>
                </Link>
                <p className="small" style={{ margin: 0 }}>{ficha?.intro}</p>
                <Link href={`/marcas/${marca.slug}`} aria-label={`Ver ficha de ${marca.nombre}`}>→</Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
