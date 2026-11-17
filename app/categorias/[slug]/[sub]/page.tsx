import { notFound, permanentRedirect } from "next/navigation";
import { getCategorias } from "@/lib/content/load";

export function generateStaticParams() {
  return getCategorias().flatMap((categoria) =>
    categoria.subcategorias.map((sub) => ({ slug: categoria.slug, sub: sub.slug })),
  );
}

export const dynamicParams = false;

export default async function SubcategoriaPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const categoria = getCategorias().find((item) => item.slug === slug);
  if (!categoria?.subcategorias.some((item) => item.slug === sub)) notFound();
  permanentRedirect(`/categorias/${slug}?sub=${sub}`);
}
