/**
 * Identidad pública del sitio. El nombre y la URL salen de variables de entorno
 * para reemplazar los placeholders [NOMBRE PORTAL] y [dominio] sin tocar el copy.
 */

export function getSiteName(): string {
  const name = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
  return name && name.length > 0 ? name : "Portal FIT";
}

const DEFAULT_SITE_URL = "https://www.portalfit.com.ar";

function normalizeSiteUrl(value: string | undefined): string | null {
  const url = value?.trim().replace(/\/+$/, "");
  return url && /^https?:\/\//.test(url) ? url : null;
}

/** URL canónica, sin barra final. Si la env no está, el dominio definitivo. */
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? DEFAULT_SITE_URL;

export function getSiteUrl(): string {
  return SITE_URL;
}

/** Solo el rótulo público. Si no está definido, el pie no muestra dominio. */
export function getDomainLabel(): string | null {
  const label = process.env.NEXT_PUBLIC_DOMAIN_LABEL?.trim();
  return label ? label : null;
}

/** Única fuente del noindex. Solo "true" habilita el indexado; cualquier otro valor lo deja apagado. */
export function isIndexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export function robotsMetadata(): { index: boolean; follow: boolean; nocache?: boolean } {
  if (isIndexingAllowed()) return { index: true, follow: true };
  return { index: false, follow: false, nocache: true };
}

/** El formulario no guarda nada. Solo se muestra si esta variable es "true". */
export function newsletterEnabled(): boolean {
  return process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === "true";
}

const CONTACT_USER_CODES = [109, 46, 103, 97, 108, 109, 97, 114, 105, 110, 111];
const CONTACT_DOMAIN_CODES = [103, 109, 97, 105, 108, 46, 99, 111, 109];

function fromCodes(codes: number[]): string {
  return String.fromCharCode(...codes);
}

/** Usuario y dominio por separado. No armar la dirección en un solo string. */
export function contactEmailUser(): string {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL_USER?.trim();
  return value ? value : fromCodes(CONTACT_USER_CODES);
}

export function contactEmailDomain(): string {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL_DOMAIN?.trim();
  return value ? value : fromCodes(CONTACT_DOMAIN_CODES);
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
