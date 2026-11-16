import { curatedAffiliateProvider } from "@/lib/affiliates/curated";
import type { AffiliateProvider } from "@/lib/affiliates/types";

/**
 * Única puerta de los listados de Mercado Libre.
 * Hoy lee el catálogo curado de content/productos.json.
 */
export function getAffiliateProvider(): AffiliateProvider {
  return curatedAffiliateProvider;
}

export type { AffiliateProduct, AffiliateProvider } from "@/lib/affiliates/types";
export { blockHasAffiliate, getAffiliateProduct } from "@/lib/affiliates/curated";
