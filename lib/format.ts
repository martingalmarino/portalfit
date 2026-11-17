import { getDomainLabel, getSiteName } from "@/lib/site";

export type EvidenceLevel = "alto" | "moderado" | "bajo" | "precaucion" | "variable";

export const EVIDENCE: Record<
  EvidenceLevel,
  { label: string; grade: "A" | "B" | "C" | "D" | null; chip: string; gradeClass: string }
> = {
  alto: { label: "Alta", grade: "A", chip: "ev-alto", gradeClass: "g-A" },
  moderado: { label: "Moderada", grade: "B", chip: "ev-moderado", gradeClass: "g-B" },
  bajo: { label: "Baja", grade: "C", chip: "ev-bajo", gradeClass: "g-C" },
  precaucion: { label: "Precaución", grade: "D", chip: "ev-precaucion", gradeClass: "g-D" },
  variable: { label: "Variable", grade: null, chip: "ev-variable", gradeClass: "" },
};

/**
 * Marcadores internos, no palabras del texto publicado.
 * Oculta [PENDIENTE], [PENDIENTE: …], el token PENDIENTE en mayúsculas
 * y [EJEMPLO] / "Texto de ejemplo". Deja pasar "por ejemplo", "de ejemplo" y "pendiente".
 */
const INTERNAL_MARKER = /\[PENDIENTE\b[^\]]*\]|\bPENDIENTE\b|\[EJEMPLO\b[^\]]*\]|Texto de ejemplo/;

export function applyPlaceholders(text: string): string {
  const domain = getDomainLabel();
  return text.replaceAll("[NOMBRE PORTAL]", getSiteName()).replaceAll("[dominio]", domain ?? "");
}

export function hasPendingToken(text: string): boolean {
  return INTERNAL_MARKER.test(text);
}

/**
 * Texto visible. Oculta un dato que no está: saca oraciones y paréntesis
 * que traen un marcador interno, y no deja un rótulo en su lugar.
 */
export function publicCopy(text: string): string | null {
  let value = applyPlaceholders(text);
  value = value.replace(/\s*\((?:[^()]|\([^()]*\))*\)/g, (group) => (INTERNAL_MARKER.test(group) ? "" : group));
  const kept = value
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.replace(/\s{2,}/g, " ").trim())
    .filter((part) => part.length > 0 && !INTERNAL_MARKER.test(part));
  const joined = kept.join(" ").trim();
  if (!joined || INTERNAL_MARKER.test(joined)) return null;
  return joined;
}

/** Texto de una guía publicada. Conserva el castellano corriente y oculta solo [dominio] o PENDIENTE. */
const INTERNAL_TOKEN = /\[dominio\]|\[PENDIENTE\b[^\]]*\]|\bPENDIENTE\b|\[EJEMPLO\b[^\]]*\]|Texto de ejemplo/;

export function publishedCopy(text: string): string | null {
  const kept = text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.replace(/\s{2,}/g, " ").trim())
    .filter((part) => part.length > 0 && !INTERNAL_TOKEN.test(part));
  const joined = applyPlaceholders(kept.join(" ")).trim();
  if (!joined || INTERNAL_TOKEN.test(joined)) return null;
  return joined;
}

/** Año de fundación usable en JSON-LD. Solo si el dato es un número, no una frase. */
export function publicYear(raw: string | number): string | null {
  if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 1000 || raw > 2100) return null;
  return String(raw);
}

export function formatContentDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso.trim());
  if (!match) return applyPlaceholders(iso);
  return `${match[3]}/${match[2]}/${match[1]}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function pathOf(url: string): string {
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

/** Año para la ficha compacta. Si el dato no arranca con un año, no se inventa. */
export function compactYear(raw: string | number): { label: string | null; pending: boolean } {
  const text = publicCopy(String(raw));
  if (!text) return { label: null, pending: true };
  const year = /^(\d{4})\b/.exec(text);
  return { label: year?.[1] ?? text, pending: false };
}

export function firstClause(text: string): string | null {
  return publicCopy(text);
}

export function shortOrigin(origen: string): string | null {
  const full = publicCopy(origen);
  if (!full) return null;
  const countryRaw = full.split("(")[0]?.trim() ?? full;
  const country = /^estados unidos/i.test(countryRaw) ? "EE. UU." : countryRaw;
  const inner = /\((.*)\)/.exec(full)?.[1] ?? "";
  const haystack = `${inner} ${full}`;
  if (/importada/i.test(haystack)) return `${country} · Importada`;
  const priority = [
    "Bahía Blanca",
    "Córdoba",
    "Del Viso",
    "Quilmes",
    "Rafaela",
    "Rosario",
    "CABA",
    "Santa Fe",
  ];
  const city = priority.find((item) => haystack.toLowerCase().includes(item.toLowerCase()));
  if (city) return `${country} · ${city}`;
  if (/buenos aires/i.test(haystack)) return `${country} · Prov. de Buenos Aires`;
  return country;
}

export type CertState = "verificado" | "documento" | "declarado" | "terceros" | "inferencia" | "rotulo" | "sin_dato";

export function parseCertification(raw: string): { state: CertState; title: string; detail: string } {
  const tag = /^\[([^\]]+)\]\s*/.exec(raw);
  const label = tag?.[1] ?? "";
  const rest = (tag ? raw.slice(tag[0].length) : raw).trim();
  const lower = `${label} ${rest}`.toLowerCase();
  let state: CertState = "declarado";
  if (/ver rótulo|ver rotulo|en el rótulo|en el rotulo/.test(lower)) state = "rotulo";
  else if (label.toLowerCase().includes("verific") || lower.includes("registro oficial")) state = "verificado";
  else if (label.toLowerCase().includes("documento oficial")) state = "documento";
  else if (label.toLowerCase().includes("inferencia")) state = "inferencia";
  else if (label.toLowerCase().includes("sin dato")) state = "sin_dato";
  else if (label.toLowerCase().includes("declarado")) state = "declarado";
  else if (label.toLowerCase().includes("terceros")) state = "terceros";
  const title = rest.replace(/\s+/g, " ");
  return { state, title, detail: label };
}

export const CERT_LABEL: Record<CertState, string> = {
  verificado: "Registro oficial consultado",
  documento: "Documento oficial publicado por la marca",
  declarado: "Declarado por la marca",
  terceros: "Informado por terceros",
  inferencia: "Inferencia propia",
  rotulo: "En el rótulo",
  sin_dato: "Sin dato verificable",
};

export function splitLabeledUrl(line: string): { label: string; href?: string } {
  const match = /^(.*?)(https?:\/\/\S+)/.exec(line.trim());
  if (!match) return { label: line.trim() };
  const href = match[2].replace(/[).,]+$/, "");
  const label = match[1].replace(/[:–—\s]+$/, "").trim();
  return { label: label || hostOf(href), href };
}

export function isHttpUrl(value: string): boolean {
  return /^https?:\/\//.test(value.trim());
}

export function formatExamplePrice(amount: number): string {
  const formatted = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(amount);
  return `$ ${formatted}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  const words = name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function sentences(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}
