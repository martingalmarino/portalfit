import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const linkSchema = z.object({
  texto: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
  frase: z.string().min(1).optional(),
  phrase: z.string().min(1).optional(),
  href: z.string().min(1).optional(),
});

const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
  fuentes: z.array(z.string()).default([]),
  enlaces: z.array(linkSchema).optional(),
});

const blockSchema = z.object({
  h3: z.string().min(1),
  texto: z.string().min(1),
  enlaces: z.array(linkSchema).default([]),
});

export const hubsSchema = z.object({
  marcas: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    kicker: z.string().min(1),
    h1: z.string().min(1),
    intro: z.string().min(1),
    vistazo_h2: z.string().min(1),
    fichas_h2: z.string().min(1),
    criterio_h2: z.string().min(1),
    criterio: z.string().min(1),
    criterio_frase: linkSchema,
    mirar_h2: z.string().min(1),
    mirar: z.array(blockSchema).min(1),
    faq_h2: z.string().min(1),
    faq: z.array(faqSchema).min(1),
    seguir_h2: z.string().min(1),
    seguir: z.array(linkSchema).min(1),
  }),
  categorias: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    kicker: z.string().min(1),
    h1: z.string().min(1),
    intro: z.string().min(1),
    intro_frase: linkSchema,
    grupos: z.array(
      z.object({
        nivel: z.string().min(1),
        h2: z.string().min(1),
        orden: z.array(z.string().min(1)).min(1),
      }),
    ).min(1),
    nivel_h2: z.string().min(1),
    nivel_texto: z.string().min(1),
    nivel_enlaces: z.array(linkSchema).min(1),
    creatina_enlace: linkSchema,
    faq_h2: z.string().min(1),
    faq: z.array(faqSchema).min(1),
    cierre: linkSchema,
  }),
  etapas: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    kicker: z.string().min(1),
    h1: z.string().min(1),
    intro: z.string().min(1),
    intro_frase: linkSchema,
    grupos: z.array(
      z.object({
        h2: z.string().min(1),
        slugs: z.array(z.string().min(1)).min(1),
      }),
    ).min(1),
    repetido_h2: z.string().min(1),
    repetido: z.array(blockSchema).min(1),
    faq_h2: z.string().min(1),
    faq: z.array(faqSchema).min(1),
  }),
  blog: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    kicker: z.string().min(1),
    h1: z.string().min(1),
    intro: z.string().min(1),
    destacada_h2: z.string().min(1),
    destacada_slug: z.string().min(1),
    lista_h2: z.string().min(1),
    seguir_h2: z.string().min(1),
    seguir: z.array(linkSchema).min(1),
    faq_h2: z.string().min(1),
    faq: z.array(faqSchema).min(1),
  }),
});

export type HubsFile = z.infer<typeof hubsSchema>;
export type HubLink = z.infer<typeof linkSchema>;
export type HubFaq = z.infer<typeof faqSchema>;

let cache: HubsFile | undefined;

export function loadHubs(): HubsFile {
  if (cache) return cache;
  const file = path.join(process.cwd(), "content", "hubs.json");
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as unknown;
  const result = hubsSchema.safeParse(raw);
  if (!result.success) {
    const lines = result.error.issues
      .slice(0, 16)
      .map((issue) => `• ${issue.path.join(".") || "(raíz)"}: ${issue.message}`);
    throw new Error(`El contenido de content/hubs.json no pasa la validación:\n${lines.join("\n")}`);
  }
  cache = result.data;
  return cache;
}

/** El «14» del meta y del H2 de la grilla sale de marcas.length. El resto del copy queda literal. */
export function marcasCountText(text: string, count: number): string {
  return text
    .replaceAll("Fichas de 14 marcas", `Fichas de ${count} marcas`)
    .replaceAll("Las 14 marcas", `Las ${count} marcas`);
}

const RESTO_EN_PALABRAS: Record<number, string> = { 10: "diez" };

/** «diez categorías más» sale de categorias.length − 4. Con 14 categorías el texto no cambia. */
export function categoriasCountText(text: string, count: number): string {
  const resto = count - 4;
  const palabra = RESTO_EN_PALABRAS[resto] ?? String(resto);
  return text.replaceAll("diez categorías más", `${palabra} categorías más`);
}

export function hubInternalPaths(value: unknown): string[] {
  const found = new Set<string>();
  const walk = (node: unknown) => {
    if (typeof node === "string") {
      const match = /^(\/[a-z0-9/-]+)/i.exec(node.trim());
      if (match) found.add(match[1]);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node && typeof node === "object") Object.values(node).forEach(walk);
  };
  walk(value);
  return [...found];
}
