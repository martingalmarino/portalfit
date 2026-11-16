/**
 * Identidad pública del sitio. El nombre y la URL salen de variables de entorno
 * para reemplazar los placeholders [NOMBRE PORTAL] y [dominio] sin tocar el copy.
 */

export function getSiteName(): string {
  const name = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
  return name && name.length > 0 ? name : "Portal FIT";
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (raw && /^https?:\/\//.test(raw)) return raw;
  return "http://localhost:3000";
}

/** Host visible. Si no hay URL configurada, se conserva el placeholder. */
export function getDomainLabel(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "[dominio]";
  try {
    return new URL(raw).host;
  } catch {
    return "[dominio]";
  }
}

export function allowsIndexing(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
