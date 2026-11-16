import { mockAffiliateProvider } from "@/lib/affiliates/mock";
import type { AffiliateProvider } from "@/lib/affiliates/types";

/**
 * Única puerta de los listados de Mercado Libre.
 * Hoy devuelve el proveedor mock. Para la API real, ver README de esta carpeta:
 * se reemplaza esta función y se agrega `revalidate` en las rutas que listen productos.
 */
export function getAffiliateProvider(): AffiliateProvider {
  return mockAffiliateProvider;
}

export type { AffiliateProduct, AffiliateProvider } from "@/lib/affiliates/types";
export { getAffiliateProduct } from "@/lib/affiliates/mock";
