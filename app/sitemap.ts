import type { MetadataRoute } from "next";
import { getCategorias, getEtapas, getMarcas, getPublishedPosts } from "@/lib/content/load";
import { absoluteUrl } from "@/lib/site";
import { PLANNED_TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/marcas",
    "/categorias",
    "/blog",
    "/etapas",
    "/herramientas",
    "/como-evaluamos",
    "/transparencia-afiliados",
    "/privacidad",
    "/terminos",
    "/creditos",
    "/contacto",
  ];
  const dated = "2026-11-16";
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path), lastModified: dated })),
    ...getMarcas().map((item) => ({ url: absoluteUrl(`/marcas/${item.slug}`), lastModified: dated })),
    ...getCategorias().map((item) => ({ url: absoluteUrl(`/categorias/${item.slug}`), lastModified: dated })),
    ...getEtapas().map((item) => ({ url: absoluteUrl(`/etapas/${item.slug}`), lastModified: dated })),
    ...getPublishedPosts().map((item) => ({ url: absoluteUrl(`/blog/${item.slug}`), lastModified: item.date })),
    ...PLANNED_TOOLS.map((item) => ({ url: absoluteUrl(`/herramientas/${item.slug}`), lastModified: dated })),
  ];
}
