import type { EvidenceLevel } from "@/lib/format";

/**
 * Producto de afiliado listo para renderizar.
 * `ejemplo` queda en true mientras la fuente sea el mock: no hay precio real.
 */
export type AffiliateProduct = {
  id: string;
  titulo: string;
  marcaSlug: string;
  marcaNombre: string;
  categoriaSlug: string;
  categoriaNombre: string;
  subcategoria?: string;
  etiquetas: string[];
  precioEjemplo: number;
  precioLabel: string;
  ejemplo: true;
  imagen: string;
  posicion: string;
  href: string;
  urlTipo: "tienda-oficial" | "busqueda-ejemplo";
  notaEditorial: string;
  destacado: boolean;
  masVendidoSegunMarca: boolean;
  evidence: EvidenceLevel;
  tiendaOficial: boolean;
  rneVerificado: boolean;
};

export interface AffiliateProvider {
  getFeatured(limit?: number): AffiliateProduct[];
  getProductsByBrand(brandSlug: string): AffiliateProduct[];
  getProductsByCategory(categorySlug: string): AffiliateProduct[];
}
