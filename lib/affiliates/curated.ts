import { loadAffiliateFile, loadMarcas, loadTaxonomia } from "@/lib/content/load";
import { productHref } from "@/lib/affiliates/links";
import { blockHasAffiliate } from "@/lib/affiliates/notice";
import type { AffiliateProduct, AffiliateProvider } from "@/lib/affiliates/types";

const HOME_PICKS = ["proteinas", "creatina", "pre-entrenos", "aminoacidos"];

function catalog(): AffiliateProduct[] {
  const file = loadAffiliateFile();
  const marcas = new Map(loadMarcas().marcas.map((item) => [item.slug, item]));
  const categorias = new Map(loadTaxonomia().categorias.map((item) => [item.slug, item]));
  return file.productos.map((product) => {
    const marca = marcas.get(product.marca);
    const categoria = categorias.get(product.categoria);
    if (!marca || !categoria) {
      throw new Error(`El producto "${product.id}" no tiene marca o categoría cargada`);
    }
    const afiliado = Boolean(product.affiliateUrl);
    return {
      id: product.id,
      titulo: product.titulo,
      marcaSlug: marca.slug,
      marcaNombre: marca.nombre,
      categoriaSlug: categoria.slug,
      categoriaNombre: categoria.nombre,
      subcategoria: product.subcategoria,
      etiquetas: product.etiquetas,
      imagenUrl: product.imagenUrl,
      posicion: product.posicion ?? "50% 50%",
      href: productHref({
        url: product.url,
        affiliateUrl: product.affiliateUrl,
        titulo: product.titulo,
        provisional: product.provisional,
      }),
      afiliado,
      destacado: product.destacado,
      masVendidoSegunMarca: product.masVendidoSegunMarca,
      evidence: categoria.nivel_evidencia,
      tiendaOficial: product.tiendaOficial,
      rneVerificado: marca.rne_consultado_sifega,
    };
  });
}

export const curatedAffiliateProvider: AffiliateProvider = {
  getFeatured(limit = 4) {
    const all = catalog();
    const flagged = all.filter((item) => item.destacado);
    if (flagged.length > 0) return flagged.slice(0, limit);
    return HOME_PICKS.flatMap((slug) => {
      const match = all.find((item) => item.categoriaSlug === slug);
      return match ? [match] : [];
    }).slice(0, limit);
  },
  getProductsByBrand(brandSlug: string) {
    return catalog().filter((item) => item.marcaSlug === brandSlug);
  },
  getProductsByCategory(categorySlug: string) {
    return catalog().filter((item) => item.categoriaSlug === categorySlug);
  },
};

export function getAffiliateProduct(id: string): AffiliateProduct | undefined {
  return catalog().find((item) => item.id === id);
}

export { blockHasAffiliate };
