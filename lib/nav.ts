import { getCategorias, getEtapas, getMarcas, getPost, getPublishedPosts } from "@/lib/content/load";
import { EVIDENCE } from "@/lib/format";

export type NavLink = { href: string; label: string; meta?: string };

export type SearchEntry = { href: string; title: string; kind: string; haystack: string };

export type NavData = {
  categories: NavLink[];
  brands: NavLink[];
  stages: NavLink[];
  search: SearchEntry[];
};

export function getNavData(): NavData {
  const categories = getCategorias().map((item) => ({
    href: `/categorias/${item.slug}`,
    label: item.nombre,
    meta: EVIDENCE[item.nivel_evidencia].label,
  }));
  const brands = getMarcas().map((item) => ({
    href: `/marcas/${item.slug}`,
    label: item.nombre,
  }));
  const stages = getEtapas().map((item) => ({
    href: `/etapas/${item.slug}`,
    label: item.nombre,
  }));
  const posts = getPublishedPosts().map((item) => ({
    href: `/blog/${item.slug}`,
    label: item.title,
  }));
  const search: SearchEntry[] = [
    ...categories.map((item) => ({ href: item.href, title: item.label, kind: "Categoría", haystack: item.label })),
    ...brands.map((item) => ({ href: item.href, title: item.label, kind: "Marca", haystack: item.label })),
    ...stages.map((item) => ({ href: item.href, title: item.label, kind: "Etapa", haystack: item.label })),
    ...posts.map((item) => {
      const post = getPost(item.href.replace("/blog/", ""));
      return {
        href: item.href,
        title: item.label,
        kind: "Guía",
        haystack: `${item.label} ${post?.excerpt ?? ""}`,
      };
    }),
  ];
  return { categories, brands, stages, search };
}
