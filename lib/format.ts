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

const PENDING = "PENDIENTE";

export function applyPlaceholders(text: string): string {
  return text.replaceAll("[NOMBRE PORTAL]", getSiteName()).replaceAll("[dominio]", getDomainLabel());
}

export function hasPendingToken(text: string): boolean {
  return text.includes(PENDING);
}

/** Reemplaza el token editorial PENDIENTE por la etiqueta visible. No inventa el dato. */
export function pendingParts(text: string): Array<{ pending: boolean; text: string }> {
  const filled = applyPlaceholders(text);
  return filled.split(PENDING).flatMap((part, index, all) => {
    const nodes: Array<{ pending: boolean; text: string }> = [];
    if (part) nodes.push({ pending: false, text: part });
    if (index < all.length - 1) nodes.push({ pending: true, text: "Pendiente" });
    return nodes;
  });
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
export function compactYear(raw: string | number): { label: string; pending: boolean } {
  const full = String(raw).trim();
  if (full === PENDING || full.startsWith(PENDING)) return { label: "Pendiente", pending: true };
  const year = /^(\d{4})\b/.exec(full);
  if (year) return { label: year[1], pending: full.includes(PENDING) };
  if (full.includes(PENDING)) return { label: "Pendiente", pending: true };
  return { label: full.length > 28 ? `${full.slice(0, 27)}…` : full, pending: false };
}

export function firstClause(text: string, max = 48): string {
  const clause = applyPlaceholders(text).split(";")[0]?.trim() ?? text;
  if (clause.length <= max) return clause;
  return `${clause.slice(0, max - 1)}…`;
}

export function shortOrigin(origen: string): string {
  const full = applyPlaceholders(origen).trim();
  if (full === PENDING || full.startsWith(PENDING)) return "Pendiente";
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

export type CertState = "verificado" | "declarado" | "documento" | "terceros" | "pendiente" | "rotulo";

export function parseCertification(raw: string): { state: CertState; title: string; detail: string } {
  const tag = /^\[([^\]]+)\]\s*/.exec(raw);
  const label = tag?.[1] ?? "";
  const rest = (tag ? raw.slice(tag[0].length) : raw).trim();
  const lower = `${label} ${rest}`.toLowerCase();
  let state: CertState = "declarado";
  if (/ver rótulo|ver rotulo/.test(lower)) state = "rotulo";
  else if (label.toLowerCase().includes("verific")) state = "verificado";
  else if (label.toLowerCase().includes("documento oficial")) state = "documento";
  else if (label.toLowerCase().includes("declarado")) state = "declarado";
  else if (label.toLowerCase().includes("terceros")) state = "terceros";
  else if (
    lower.includes("pendiente") ||
    lower.includes("no se declaran") ||
    lower.includes("no verific")
  ) {
    state = "pendiente";
  }
  const title = rest.replace(/\s+/g, " ");
  return { state, title, detail: label };
}

export const CERT_LABEL: Record<CertState, string> = {
  verificado: "Verificado",
  declarado: "Declarado",
  documento: "Documento oficial",
  terceros: "Terceros",
  pendiente: "Pendiente",
  rotulo: "Ver rótulo",
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
