import { notFound } from "next/navigation";
import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";
import { PLANNED_TOOLS } from "@/lib/tools";

const FILES: Record<string, string> = {
  "proteina-diaria": "herramientas-proteina-diaria",
};

export function generateStaticParams() {
  return PLANNED_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = FILES[slug];
  if (!file) return {};
  const page = loadTextPage(file);
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/herramientas/${slug}`,
    absoluteTitle: page.absoluteTitle,
  });
}

export default async function HerramientaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = FILES[slug];
  if (!file) notFound();
  const page = loadTextPage(file);
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Herramientas", path: "/herramientas" },
        { name: page.h1, path: `/herramientas/${slug}` },
      ]}
    />
  );
}
