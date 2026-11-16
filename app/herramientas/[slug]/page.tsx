import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/ui/crumbs";
import { pageMetadata } from "@/lib/seo";
import { getPlannedTool, PLANNED_TOOLS } from "@/lib/tools";

export function generateStaticParams() {
  return PLANNED_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getPlannedTool(slug);
  if (!tool) return {};
  return pageMetadata({
    title: tool.nombre,
    description: `${tool.descripcion} Próximamente.`,
    path: `/herramientas/${slug}`,
  });
}

export default async function HerramientaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getPlannedTool(slug);
  if (!tool) notFound();
  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Herramientas", path: "/herramientas" },
            { name: tool.nombre, path: `/herramientas/${slug}` },
          ]}
        />
        <div className="page-hero">
          <span className="soon">Próximamente</span>
          <h1 className="h1" style={{ marginTop: 16 }}>{tool.nombre}</h1>
          <p className="lede" style={{ marginTop: 16 }}>{tool.descripcion}</p>
        </div>
        <p>
          Esta URL queda reservada para la etapa 2. Hoy no pide peso, no estima un rango y no guarda lo que escribas, porque no hay formulario.
        </p>
        <p>
          Mientras tanto, la guía de ejemplo sobre proteína está en{" "}
          <Link href="/blog/proteina-despues-de-los-40">Proteína después de los 40</Link>.
        </p>
      </div>
    </article>
  );
}
