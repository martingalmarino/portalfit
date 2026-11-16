/**
 * El link de afiliado no se arma acá. Si el producto trae `affiliateUrl`,
 * el botón usa ese valor sin agregar parámetros. Si no, el destino es la
 * URL limpia (o una búsqueda por título cuando la URL todavía es provisoria)
 * con utm_source y utm_campaign.
 */

export function listingSearchUrl(title: string): string {
  const slug = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `https://listado.mercadolibre.com.ar/${slug || "suplementos"}`;
}

export function productHref(input: {
  url: string;
  affiliateUrl?: string;
  titulo: string;
  provisional?: boolean;
}): string {
  if (input.affiliateUrl) return input.affiliateUrl;
  const destination = input.provisional ? listingSearchUrl(input.titulo) : input.url;
  let url: URL;
  try {
    url = new URL(destination);
  } catch {
    return destination;
  }
  url.searchParams.set("utm_source", "portalfit");
  url.searchParams.set("utm_medium", "afiliado");
  url.searchParams.set("utm_campaign", "portalfit");
  return url.toString();
}
