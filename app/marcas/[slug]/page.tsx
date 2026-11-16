import { notFound } from "next/navigation";
import { BrandView } from "@/components/marca/brand-view";
import { JsonLd } from "@/components/ui/json-ld";
import { getFicha, getMarcas } from "@/lib/content/load";
import { applyPlaceholders, isHttpUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getMarcas().map((marca) => ({ slug: marca.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ficha = getFicha(slug);
  if (!ficha) return {};
  return pageMetadata({
    title: applyPlaceholders(ficha.meta.title),
    description: applyPlaceholders(ficha.meta.description),
    path: `/marcas/${slug}`,
    absoluteTitle: true,
  });
}

export default async function MarcaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ficha = getFicha(slug);
  if (!ficha) notFound();
  const logo = ficha.schema_sugerido.logo;
  const brand: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: ficha.schema_sugerido.name,
    url: absoluteUrl(`/marcas/${slug}`),
    description: applyPlaceholders(ficha.intro),
  };
  if (typeof logo === "string" && isHttpUrl(logo)) brand.logo = logo;
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ficha.faq.map((item) => ({
      "@type": "Question",
      name: applyPlaceholders(item.q),
      acceptedAnswer: { "@type": "Answer", text: applyPlaceholders(item.a) },
    })),
  };
  return (
    <>
      <JsonLd data={brand} />
      <JsonLd data={faq} />
      <BrandView slug={slug} />
    </>
  );
}
