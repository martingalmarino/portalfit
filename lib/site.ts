/**
 * Identidad pública del sitio. El nombre y la URL salen de variables de entorno
 * para reemplazar los placeholders [NOMBRE PORTAL] y [dominio] sin tocar el copy.
 */

export function getSiteName(): string {
  const name = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
  return name && name.length > 0 ? name : "Portal FIT";
}

function httpsHost(value: string | undefined): string | null {
  const host = value?.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  return host ? `https://${host}` : null;
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit && /^https?:\/\//.test(explicit)) return explicit;
  return (
    httpsHost(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    httpsHost(process.env.VERCEL_URL) ??
    "http://localhost:3000"
  );
}

/** Solo el rótulo público. Si no está definido, el pie no muestra dominio. */
export function getDomainLabel(): string | null {
  const label = process.env.NEXT_PUBLIC_DOMAIN_LABEL?.trim();
  return label ? label : null;
}

export function allowsIndexing(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
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
