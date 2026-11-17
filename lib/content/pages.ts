import fs from "node:fs";
import path from "node:path";
import { applyPlaceholders } from "@/lib/format";
import { getSiteName } from "@/lib/site";

export type TextSection = {
  h2: string;
  paragraphs: string[];
  table?: { columns: string[]; rows: string[][] };
};

export type TextCard = { title: string; text: string; state?: string; url?: string };

export type TextDoc = {
  slug: string;
  title: string;
  description: string;
  absoluteTitle: boolean;
  kicker?: string;
  h1: string;
  bajada?: string;
  sections: TextSection[];
  cards: TextCard[];
  links: Array<{ text: string; url: string }>;
  updated?: string;
};

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function asParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function loadTextPage(file: string): TextDoc {
  const full = path.join(process.cwd(), "content", "paginas", `${file}.json`);
  const data = JSON.parse(fs.readFileSync(full, "utf8")) as Record<string, unknown>;
  const meta = (data.meta ?? {}) as Record<string, unknown>;
  const rawTitle = asString(meta.title) ?? asString(data.meta_title) ?? asString(data.h1) ?? "Portal FIT";
  const rawDescription = asString(meta.description) ?? asString(data.meta_description) ?? "";
  const name = getSiteName();
  const title = applyPlaceholders(rawTitle).replace(/\s+/g, " ").trim();
  const description = applyPlaceholders(rawDescription).trim();
  const sections = Array.isArray(data.secciones) ? data.secciones : Array.isArray(data.parrafos) ? [{ h2: "", parrafos: data.parrafos }] : [];
  return {
    slug: asString(data.slug) ?? file,
    title,
    description,
    absoluteTitle: title.toLowerCase().includes(`| ${name.toLowerCase()}`),
    kicker: asString(data.kicker),
    h1: asString(data.h1) ?? title,
    bajada: asString(data.bajada),
    sections: sections.map((section) => {
      const item = section as Record<string, unknown>;
      const table = item.tabla as { columnas?: unknown; filas?: unknown } | undefined;
      const columns = Array.isArray(table?.columnas) ? table.columnas.filter((col): col is string => typeof col === "string") : [];
      const rows = Array.isArray(table?.filas)
        ? table.filas
            .filter((row): row is unknown[] => Array.isArray(row))
            .map((row) => row.map((cell) => String(cell)))
        : [];
      return {
        h2: asString(item.h2) ?? "",
        paragraphs: asParagraphs(item.parrafos),
        table: columns.length > 0 ? { columns, rows } : undefined,
      };
    }),
    cards: Array.isArray(data.tarjetas)
      ? data.tarjetas.map((card) => {
          const item = card as Record<string, unknown>;
          return {
            title: asString(item.titulo) ?? "",
            text: asString(item.texto) ?? "",
            state: asString(item.estado),
            url: asString(item.url),
          };
        })
      : [],
    links: Array.isArray(data.enlaces)
      ? data.enlaces.flatMap((link) => {
          const item = link as Record<string, unknown>;
          const text = asString(item.texto);
          const url = asString(item.url);
          return text && url ? [{ text, url }] : [];
        })
      : [],
    updated: asString(data.actualizado),
  };
}
