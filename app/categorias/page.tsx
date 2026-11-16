import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { getCategorias } from "@/lib/content/load";
import { EVIDENCE, pad2 } from "@/lib/format";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Categorías",
  description:
    "Catorce categorías de suplementos y nutrición deportiva, cada una con un nivel general de evidencia según AIS e ISSN.",
  path: "/categorias",
});

export default function CategoriasPage() {
  const categorias = getCategorias();
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Categorías", path: "/categorias" }]} />
        <JsonLd
          data={itemListJsonLd(
            "Categorías",
            "/categorias",
            categorias.map((item) => ({ name: item.nombre, path: `/categorias/${item.slug}` })),
          )}
        />
        <div className="page-hero">
          <div className="kicker">Nº 04 · Evidencia por categoría</div>
          <h1 className="h1">{categorias.length} categorías, cada una con su nivel</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 720 }}>
            El grado es general y orientativo. No es una recomendación individual ni un permiso para usar un producto.
          </p>
        </div>
        <ol className="cindex">
          {categorias.map((categoria, index) => {
            const meta = EVIDENCE[categoria.nivel_evidencia];
            return (
              <li key={categoria.slug}>
                <Link href={`/categorias/${categoria.slug}`}>
                  <span className="num">{pad2(index + 1)}</span>
                  <span>
                    <b className="serif" style={{ fontSize: 22, color: "var(--ink)" }}>{categoria.nombre}</b>
                    <span className="small" style={{ display: "block" }}>{categoria.descripcion}</span>
                  </span>
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
    </section>
  );
}
