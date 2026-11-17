import { notFound } from "next/navigation";
import { BrandView } from "@/components/marca/brand-view";
import { JsonLd } from "@/components/ui/json-ld";
import { getFicha, getMarcas } from "@/lib/content/load";
import { applyPlaceholders, isHttpUrl, publicCopy, publicYear } from "@/lib/format";
import { brandTitle, faqJsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getMarcas().map((marca) => ({ slug: marca.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ficha = getFicha(slug);
  if (!ficha) return {};
  const marca = getMarcas().find((item) => item.slug === slug);
  return pageMetadata({
    title: brandTitle(marca?.nombre ?? slug, applyPlaceholders(ficha.meta.title)),
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
    description: publicCopy(ficha.intro) ?? ficha.schema_sugerido.name,
  };
  if (typeof logo === "string" && isHttpUrl(logo)) brand.logo = logo;
  const foundingDate = publicYear(ficha.anio_fundacion);
  if (foundingDate) brand.foundingDate = foundingDate;
  const faq = faqJsonLd(ficha.faq);
  return (
    <>
      <JsonLd data={brand} />
      <JsonLd data={faq} />
      <BrandView slug={slug} />
    </>
  );
}
