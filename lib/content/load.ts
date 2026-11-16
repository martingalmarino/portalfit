import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ZodType, ZodTypeDef } from "zod";
import { photoByFile } from "@/lib/photos";
import { getSiteName } from "@/lib/site";
import {
  affiliateCatalogSchema,
  fichasSchema,
  homeSchema,
  marcasSchema,
  postFrontmatterSchema,
  postsIndexSchema,
  taxonomiaSchema,
  type AffiliateCatalogFile,
  type Categoria,
  type Etapa,
  type Ficha,
  type FichasFile,
  type HomeFile,
  type Marca,
  type MarcasFile,
  type PostFrontmatter,
  type Taxonomia,
} from "@/lib/content/schema";

const contentDir = path.join(process.cwd(), "content");

function readJson(relativePath: string): unknown {
  const file = path.join(contentDir, relativePath);
  if (!fs.existsSync(file)) {
    throw new Error(`Falta el archivo de contenido obligatorio: content/${relativePath}`);
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`content/${relativePath} no es JSON válido: ${message}`);
  }
}

export function parseContent<T>(schema: ZodType<T, ZodTypeDef, unknown>, data: unknown, source: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const lines = result.error.issues
      .slice(0, 16)
      .map((issue) => `• ${issue.path.join(".") || "(raíz)"}: ${issue.message}`);
    throw new Error(`El contenido de ${source} no pasa la validación:\n${lines.join("\n")}`);
  }
  return result.data;
}

let marcasCache: MarcasFile | undefined;
let taxCache: Taxonomia | undefined;
let homeCache: HomeFile | undefined;
let fichasCache: FichasFile | undefined;
let postsCache: Post[] | undefined;
let graphChecked = false;

export function loadMarcas(): MarcasFile {
  if (!marcasCache) marcasCache = parseContent(marcasSchema, readJson("marcas.json"), "content/marcas.json");
  return marcasCache;
}

export function loadTaxonomia(): Taxonomia {
  if (!taxCache) taxCache = parseContent(taxonomiaSchema, readJson("taxonomia.json"), "content/taxonomia.json");
  return taxCache;
}

export function loadHome(): HomeFile {
  if (!homeCache) homeCache = parseContent(homeSchema, readJson("home.json"), "content/home.json");
  return homeCache;
}

export function loadFichasFile(): FichasFile {
  if (!fichasCache) fichasCache = parseContent(fichasSchema, readJson("fichas.json"), "content/fichas.json");
  return fichasCache;
}

export type PostSource = { titulo: string; url?: string };

export type Post = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  bajada: string;
  excerpt: string;
  metaTitle: string;
  keyword?: string;
  date: string;
  author: string;
  categories: string[];
  sources: PostSource[];
  headings: string[];
  toc: Array<{ id: string; label: string }>;
  readingMinutes?: number;
  image?: string;
  imageCredit?: string;
  reviewer?: string;
  reviewerRole?: string;
  evidence?: PostFrontmatter["evidence"];
  ejemplo?: boolean;
  stage?: string;
  kicker?: string;
  faq: Array<{ q: string; a: string }>;
  relatedProducts: string[];
  rail: string[];
  internalLinks: string[];
  body: string;
};

const linkWarnings: string[] = [];
const internalTextWarnings: string[] = [];

export function headingId(label: string): string {
  return label
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function asList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).map((item) => item.trim()).filter(Boolean);
}

function asSources(value: PostFrontmatter["fuentes"]): PostSource[] {
  if (!value) return [];
  return value.map((item) => (typeof item === "string" ? { titulo: item } : { titulo: item.titulo, url: item.url }));
}

function noteInternal(slug: string, field: string, text: string) {
  if (/\[dominio\]/i.test(text)) internalTextWarnings.push(`${slug} · ${field} trae [dominio] y no se muestra`);
  if (/\bpendiente\b/i.test(text)) internalTextWarnings.push(`${slug} · ${field} trae PENDIENTE y no se muestra`);
}

function markdownLinks(body: string): string[] {
  return [...body.matchAll(/\[[^\]]+\]\((\/[^)\s]+)\)/g)].map((match) => match[1].split("#")[0]);
}

export function loadPosts(): Post[] {
  if (postsCache) return postsCache;
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) {
    throw new Error("Falta el directorio content/blog");
  }
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
  if (files.length === 0) {
    throw new Error("content/blog no tiene posts");
  }
  const index = parseContent(postsIndexSchema, readJson("blog/posts.json"), "content/blog/posts.json");
  const bySlug = new Map(index.posts.map((item) => [item.slug, item]));
  linkWarnings.length = 0;
  internalTextWarnings.length = 0;
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = matter(raw);
    const frontmatter = parseContent(postFrontmatterSchema, parsed.data, `content/blog/${file}`);
    if (frontmatter.slug && frontmatter.slug !== slug) {
      throw new Error(`content/blog/${file} declara el slug "${frontmatter.slug}" y el archivo es "${slug}"`);
    }
    const indexed = bySlug.get(slug);
    if (!indexed) {
      throw new Error(`content/blog/posts.json no tiene la entrada de "${slug}"`);
    }
    const date = frontmatter.fecha ?? frontmatter.date;
    if (!date) throw new Error(`content/blog/${file} no tiene fecha`);
    const faqHeading = indexed.h2.find((heading) => headingId(heading) === "preguntas-frecuentes");
    const body = parsed.content.replace(/^## Preguntas frecuentes\s*$/m, "<!-- faq -->").split("<!-- faq -->")[0].trim();
    if (!body) throw new Error(`content/blog/${file} no tiene cuerpo`);
    for (const heading of indexed.h2) {
      if (heading === faqHeading) continue;
      if (!parsed.content.includes(`## ${heading}`)) {
        throw new Error(`El H2 "${heading}" de posts.json no está en content/blog/${file}`);
      }
    }
    const visibleBody = body
      .split(/\n{2,}/)
      .filter((block) => !/\[dominio\]/i.test(block) && !/\bpendiente\b/i.test(block))
      .join("\n\n")
      .trim();
    noteInternal(slug, "cuerpo", body);
    noteInternal(slug, "h1", indexed.h1);
    noteInternal(slug, "bajada", indexed.bajada);
    noteInternal(slug, "meta", indexed.meta_title);
    for (const item of indexed.faq) {
      noteInternal(slug, "faq", `${item.q} ${item.a}`);
    }
    const sources = asSources(frontmatter.fuentes ?? frontmatter.sources);
    for (const source of sources) noteInternal(slug, "fuente", source.titulo);
    const fromIndex = Object.values(indexed.enlaces_internos ?? {}).flat();
    const internalLinks = [...new Set([...fromIndex, ...markdownLinks(parsed.content)])];
    const headings = indexed.h2;
    if (frontmatter.image) photoByFile(frontmatter.image);
    return {
      slug,
      title: frontmatter.title,
      h1: indexed.h1,
      description: frontmatter.description,
      bajada: indexed.bajada,
      excerpt: indexed.bajada,
      metaTitle: indexed.meta_title,
      keyword: indexed.keyword_objetivo,
      date,
      author: editorialAuthor(frontmatter.autor ?? frontmatter.author),
      categories: asList(frontmatter.categoria ?? frontmatter.category),
      sources,
      headings,
      toc: headings.map((label) => ({ id: headingId(label), label })),
      readingMinutes: indexed.minutos_lectura ?? frontmatter.readingMinutes,
      image: frontmatter.image,
      imageCredit: frontmatter.imageCredit,
      reviewer: frontmatter.reviewer,
      reviewerRole: frontmatter.reviewerRole,
      evidence: frontmatter.evidence,
      ejemplo: frontmatter.ejemplo,
      stage: frontmatter.stage,
      kicker: frontmatter.kicker,
      faq: indexed.faq,
      relatedProducts: frontmatter.relatedProducts ?? [],
      rail: frontmatter.rail ?? [],
      internalLinks,
      body: visibleBody || body,
    } satisfies Post;
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : a.slug < b.slug ? -1 : 1));
  postsCache = posts;
  return posts;
}

export function getPostLinkWarnings(): string[] {
  assertContentGraph();
  return linkWarnings;
}

export function getInternalTextWarnings(): string[] {
  loadPosts();
  return internalTextWarnings;
}

/** Guías que se publican. Un MDX marcado para no publicar queda en disco y fuera del sitio. */
export function getPublishedPosts(): Post[] {
  return loadPosts().filter((post) => post.ejemplo !== true);
}

function editorialAuthor(raw: string | undefined): string {
  const team = `Equipo editorial ${getSiteName()}`;
  if (!raw || /^equipo editorial\b/i.test(raw)) return team;
  return raw;
}

export function loadAffiliateFile(): AffiliateCatalogFile {
  const raw = readJson("productos.json");
  const data = Array.isArray(raw) ? { productos: raw } : raw;
  return parseContent(affiliateCatalogSchema, data, "content/productos.json");
}

function extractMarkdownIntro(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  let started = false;
  const buffer: string[] = [];
  for (const line of lines) {
    if (line.startsWith("# ")) {
      started = true;
      continue;
    }
    if (!started) continue;
    if (line.startsWith("## ")) break;
    if (line.trim() === "") {
      if (buffer.length > 0) break;
      continue;
    }
    buffer.push(line.trim());
  }
  return buffer.join(" ");
}

export function assertContentGraph(): void {
  if (graphChecked) return;
  const marcas = loadMarcas();
  const tax = loadTaxonomia();
  const home = loadHome();
  const fichas = loadFichasFile();
  const posts = loadPosts();
  const catalog = loadAffiliateFile();

  const catSlugs = new Set(tax.categorias.map((item) => item.slug));
  const etapaSlugs = new Set(tax.etapas_de_vida.map((item) => item.slug));
  const marcaSlugs = marcas.marcas.map((item) => item.slug);
  const marcaSet = new Set(marcaSlugs);
  if (marcaSet.size !== marcaSlugs.length) {
    throw new Error("content/marcas.json tiene slugs de marca repetidos");
  }
  const fichaBySlug = new Map(fichas.fichas.map((item) => [item.slug, item]));
  if (fichaBySlug.size !== fichas.fichas.length) {
    throw new Error("content/fichas.json tiene slugs repetidos");
  }

  for (const slug of marcaSlugs) {
    const ficha = fichaBySlug.get(slug);
    if (!ficha) throw new Error(`Falta la ficha de "${slug}" en content/fichas.json`);
    const mdPath = path.join(contentDir, "fichas", `${slug}.md`);
    if (!fs.existsSync(mdPath)) {
      throw new Error(`Falta el texto de Redacción content/fichas/${slug}.md`);
    }
    const intro = extractMarkdownIntro(fs.readFileSync(mdPath, "utf8"));
    if (intro !== ficha.intro) {
      throw new Error(
        `La intro de content/fichas/${slug}.md no coincide con fichas.json. No se reescribe: hay que alinear los dos archivos.`,
      );
    }
  }
  for (const ficha of fichas.fichas) {
    if (!marcaSet.has(ficha.slug)) {
      throw new Error(`La ficha "${ficha.slug}" no está en content/marcas.json`);
    }
  }

  for (const marca of marcas.marcas) {
    for (const categoria of marca.categorias) {
      if (!catSlugs.has(categoria)) {
        throw new Error(`La marca "${marca.slug}" referencia la categoría inexistente "${categoria}"`);
      }
    }
  }
  for (const categoria of tax.categorias) {
    for (const marca of categoria.marcas) {
      if (!marcaSet.has(marca)) {
        throw new Error(`La categoría "${categoria.slug}" referencia la marca inexistente "${marca}"`);
      }
    }
  }
  for (const etapa of tax.etapas_de_vida) {
    for (const categoria of etapa.categorias_relacionadas) {
      if (!catSlugs.has(categoria)) {
        throw new Error(`La etapa "${etapa.slug}" referencia la categoría inexistente "${categoria}"`);
      }
    }
  }
  for (const item of home.bloques_categorias) {
    if (!catSlugs.has(item.slug)) throw new Error(`home.json referencia la categoría inexistente "${item.slug}"`);
  }
  for (const item of home.bloque_etapas.items) {
    if (!etapaSlugs.has(item.slug)) throw new Error(`home.json referencia la etapa inexistente "${item.slug}"`);
  }
  for (const item of home.bloque_marcas.items) {
    const ficha = fichaBySlug.get(item.slug);
    if (!ficha) throw new Error(`home.json referencia la marca inexistente "${item.slug}"`);
    if (item.resumen !== ficha.intro) {
      throw new Error(
        `El resumen de ${item.slug} en home.json no coincide con la intro de la ficha. La home tiene que usar esa intro.`,
      );
    }
  }
  for (const post of posts) {
    for (const category of post.categories) {
      if (!catSlugs.has(category)) {
        throw new Error(`El post "${post.slug}" referencia la categoría inexistente "${category}"`);
      }
    }
    if (post.stage && !etapaSlugs.has(post.stage)) {
      throw new Error(`El post "${post.slug}" referencia la etapa inexistente "${post.stage}"`);
    }
  }
  const subByCat = new Map(tax.categorias.map((item) => [item.slug, new Set(item.subcategorias.map((sub) => sub.slug))]));
  const ids = new Set<string>();
  for (const product of catalog.productos) {
    if (ids.has(product.id)) throw new Error(`content/productos.json repite el id "${product.id}"`);
    ids.add(product.id);
    if (!marcaSet.has(product.marca)) {
      throw new Error(`El producto "${product.id}" usa la marca inexistente "${product.marca}"`);
    }
    if (!catSlugs.has(product.categoria)) {
      throw new Error(`El producto "${product.id}" usa la categoría inexistente "${product.categoria}"`);
    }
    if (product.subcategoria && !subByCat.get(product.categoria)?.has(product.subcategoria)) {
      throw new Error(
        `El producto "${product.id}" usa la subcategoría inexistente "${product.subcategoria}"`,
      );
    }
    if (product.imagen && !/^https?:/i.test(product.imagen)) photoByFile(product.imagen);
  }
  for (const post of posts) {
    for (const id of post.relatedProducts) {
      if (!ids.has(id)) {
        throw new Error(`El post "${post.slug}" menciona el producto inexistente "${id}"`);
      }
    }
    const postSlugs = new Set(posts.map((item) => item.slug));
    for (const href of post.internalLinks) {
      if (!routeExists(href, { catSlugs, etapaSlugs, marcaSet, postSlugs, subByCat })) {
        const warning = `${post.slug} enlaza a ${href}, que no existe`;
        if (!linkWarnings.includes(warning)) linkWarnings.push(warning);
      }
    }
  }
  if (linkWarnings.length > 0) {
    console.warn(`Enlaces internos sin página:\n${linkWarnings.map((item) => `• ${item}`).join("\n")}`);
  }
  graphChecked = true;
}

function routeExists(
  href: string,
  known: {
    catSlugs: Set<string>;
    etapaSlugs: Set<string>;
    marcaSet: Set<string>;
    postSlugs: Set<string>;
    subByCat: Map<string, Set<string>>;
  },
): boolean {
  const pathName = href.split("?")[0]?.split("#")[0] ?? href;
  const staticPaths = new Set([
    "/",
    "/blog",
    "/marcas",
    "/categorias",
    "/etapas",
    "/como-evaluamos",
    "/herramientas",
    "/creditos",
    "/transparencia-afiliados",
    "/terminos",
    "/privacidad",
  ]);
  if (staticPaths.has(pathName)) return true;
  const parts = pathName.split("/").filter(Boolean);
  if (parts[0] === "blog" && parts.length === 2) return known.postSlugs.has(parts[1] ?? "");
  if (parts[0] === "marcas" && parts.length === 2) return known.marcaSet.has(parts[1] ?? "");
  if (parts[0] === "etapas" && parts.length === 2) return known.etapaSlugs.has(parts[1] ?? "");
  if (parts[0] === "categorias" && parts.length === 2) return known.catSlugs.has(parts[1] ?? "");
  if (parts[0] === "categorias" && parts.length === 3) {
    return known.subByCat.get(parts[1] ?? "")?.has(parts[2] ?? "") ?? false;
  }
  return false;
}

export function getMarcas(): Marca[] {
  assertContentGraph();
  return [...loadMarcas().marcas].sort((a, b) => a.ranking_relevancia - b.ranking_relevancia);
}

export function getMarca(slug: string): Marca | undefined {
  return getMarcas().find((item) => item.slug === slug);
}

export function getFichas(): Ficha[] {
  assertContentGraph();
  const order = new Map(getMarcas().map((item, index) => [item.slug, index]));
  return [...loadFichasFile().fichas].sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

export function getFicha(slug: string): Ficha | undefined {
  return getFichas().find((item) => item.slug === slug);
}

export function getCategorias(): Categoria[] {
  assertContentGraph();
  return loadTaxonomia().categorias;
}

export function getCategoria(slug: string): Categoria | undefined {
  return getCategorias().find((item) => item.slug === slug);
}

export function getEtapas(): Etapa[] {
  assertContentGraph();
  return loadTaxonomia().etapas_de_vida;
}

export function getEtapa(slug: string): Etapa | undefined {
  return getEtapas().find((item) => item.slug === slug);
}

export function getPost(slug: string): Post | undefined {
  assertContentGraph();
  return getPublishedPosts().find((item) => item.slug === slug);
}

export function contentUpdatedLabel(): string {
  return loadMarcas().actualizado;
}
