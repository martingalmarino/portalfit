import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { pageMetadata } from "@/lib/seo";
import { PLANNED_TOOLS } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "Herramientas",
  description: "Calculadoras de Portal FIT. En la etapa 1 están anunciadas y todavía no calculan.",
  path: "/herramientas",
});

export default function HerramientasPage() {
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Herramientas", path: "/herramientas" }]} />
        <div className="page-hero">
          <div className="kicker">Etapa 2</div>
          <h1 className="h1">
            Herramientas <span className="soon">Próximamente</span>
          </h1>
          <p className="lede" style={{ marginTop: 16 }}>
            La estructura de las calculadoras ya tiene su URL. En esta etapa no hacen cuentas ni guardan datos.
          </p>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {PLANNED_TOOLS.map((tool) => (
            <Link key={tool.slug} href={`/herramientas/${tool.slug}`} className="srcbox" style={{ textDecoration: "none" }}>
              <span className="soon">Próximamente</span>
              <h2 className="h3" style={{ marginTop: 10 }}>{tool.nombre}</h2>
              <p className="small">{tool.descripcion}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
