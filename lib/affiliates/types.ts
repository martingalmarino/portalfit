import type { EvidenceLevel } from "@/lib/format";

/** Producto listo para renderizar. Sin precio y sin datos internos del archivo. */
export type AffiliateProduct = {
  id: string;
  titulo: string;
  marcaSlug: string;
  marcaNombre: string;
  categoriaSlug: string;
  categoriaNombre: string;
  subcategoria?: string;
  etiquetas: string[];
  imagenUrl?: string;
  posicion: string;
  href: string;
  afiliado: boolean;
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
