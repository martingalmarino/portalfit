import { loadAffiliateFile, loadMarcas, loadTaxonomia } from "@/lib/content/load";
import { formatExamplePrice, isHttpUrl } from "@/lib/format";
import { buildAffiliateHref } from "@/lib/affiliates/links";
import type { AffiliateProduct, AffiliateProvider } from "@/lib/affiliates/types";

function catalog(): AffiliateProduct[] {
  const file = loadAffiliateFile();
  const marcas = new Map(loadMarcas().marcas.map((item) => [item.slug, item]));
  const categorias = new Map(loadTaxonomia().categorias.map((item) => [item.slug, item]));
  return file.productos.map((product) => {
    const marca = marcas.get(product.marca);
    const categoria = categorias.get(product.categoria);
    if (!marca || !categoria) {
      throw new Error(`Producto de ejemplo "${product.id}" sin marca o categoría cargada`);
    }
    const rneVerificado = marca.certificaciones.valor.some((item) => /\[verific/i.test(item));
    return {
      id: product.id,
      titulo: product.titulo,
      marcaSlug: marca.slug,
      marcaNombre: marca.nombre,
      categoriaSlug: categoria.slug,
      categoriaNombre: categoria.nombre,
      subcategoria: product.subcategoria,
      etiquetas: product.etiquetas,
      precioEjemplo: product.precioEjemplo,
      precioLabel: formatExamplePrice(product.precioEjemplo),
      ejemplo: true,
      imagen: product.imagen,
      posicion: product.posicion,
      href: buildAffiliateHref(product.url),
      urlTipo: product.urlTipo,
      notaEditorial: product.notaEditorial,
      destacado: product.destacado,
      masVendidoSegunMarca: product.masVendidoSegunMarca,
      evidence: categoria.nivel_evidencia,
      tiendaOficial: isHttpUrl(String(marca.mercado_libre.valor)),
      rneVerificado,
    };
  });
}

export const mockAffiliateProvider: AffiliateProvider = {
  getFeatured(limit = 4) {
    return catalog()
      .filter((item) => item.destacado)
      .slice(0, limit);
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
