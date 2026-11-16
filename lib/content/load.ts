import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ZodType } from "zod";
import { photoByFile } from "@/lib/photos";
import {
  affiliateCatalogSchema,
  fichasSchema,
  homeSchema,
  marcasSchema,
  postFrontmatterSchema,
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

export function parseContent<T>(schema: ZodType<T>, data: unknown, source: string): T {
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

export type Post = PostFrontmatter & { slug: string; body: string };

export function loadPosts(): Post[] {
  if (postsCache) return postsCache;
  const dir = path.join(contentDir, "blog");
  if (!fs.existsSync(dir)) {
    throw new Error("Falta el directorio content/blog");
  }
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  if (files.length === 0) {
    throw new Error("content/blog no tiene posts .mdx");
  }
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = matter(raw);
    const frontmatter = parseContent(postFrontmatterSchema, parsed.data, `content/blog/${file}`);
    if (!parsed.content.trim()) {
      throw new Error(`content/blog/${file} no tiene cuerpo`);
    }
    photoByFile(frontmatter.image);
    return {
      ...frontmatter,
      faq: frontmatter.faq ?? [],
      relatedProducts: frontmatter.relatedProducts ?? [],
      rail: frontmatter.rail ?? [],
      slug,
      body: parsed.content,
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  postsCache = posts;
  return posts;
}

export function loadAffiliateFile(): AffiliateCatalogFile {
  return parseContent(affiliateCatalogSchema, readJson("ml-mock.json"), "content/ml-mock.json");
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
    if (post.category && !catSlugs.has(post.category)) {
      throw new Error(`El post "${post.slug}" referencia la categoría inexistente "${post.category}"`);
    }
    if (post.stage && !etapaSlugs.has(post.stage)) {
      throw new Error(`El post "${post.slug}" referencia la etapa inexistente "${post.stage}"`);
    }
  }
  const subByCat = new Map(tax.categorias.map((item) => [item.slug, new Set(item.subcategorias.map((sub) => sub.slug))]));
  const ids = new Set<string>();
  for (const product of catalog.productos) {
    if (ids.has(product.id)) throw new Error(`content/ml-mock.json repite el id "${product.id}"`);
    ids.add(product.id);
    if (!marcaSet.has(product.marca)) {
      throw new Error(`El producto de ejemplo "${product.id}" usa la marca inexistente "${product.marca}"`);
    }
    if (!catSlugs.has(product.categoria)) {
      throw new Error(`El producto de ejemplo "${product.id}" usa la categoría inexistente "${product.categoria}"`);
    }
    if (product.subcategoria && !subByCat.get(product.categoria)?.has(product.subcategoria)) {
      throw new Error(
        `El producto de ejemplo "${product.id}" usa la subcategoría inexistente "${product.subcategoria}"`,
      );
    }
    photoByFile(product.imagen);
  }
  for (const post of posts) {
    for (const id of post.relatedProducts) {
      if (!ids.has(id)) {
        throw new Error(`El post "${post.slug}" menciona el producto de ejemplo inexistente "${id}"`);
      }
    }
  }
  graphChecked = true;
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
  return loadPosts().find((item) => item.slug === slug);
}

export function contentUpdatedLabel(): string {
  return loadMarcas().actualizado;
}
