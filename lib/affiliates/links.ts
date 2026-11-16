/**
 * Arma el enlace que sale en "Ver en Mercado Libre".
 *
 * ML_AFFILIATE_ID es el identificador del programa de afiliados (matt_word).
 * Si está vacío, el enlace sigue siendo el destino del mock, con UTM, y se
 * sigue marcando rel="sponsored". No se inventa un ID.
 *
 * La API real no vive acá. Ver lib/affiliates/README.md.
 */
export function buildAffiliateHref(destination: string): string {
  let url: URL;
  try {
    url = new URL(destination);
  } catch {
    return destination;
  }
  const affiliateId = process.env.ML_AFFILIATE_ID?.trim();
  if (affiliateId) {
    url.searchParams.set("matt_word", affiliateId);
  }
  url.searchParams.set("utm_source", "portal-fit");
  url.searchParams.set("utm_medium", "afiliado");
  url.searchParams.set("utm_campaign", "etapa-1");
  return url.toString();
}
