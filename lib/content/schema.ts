import { z } from "zod";

export const evidenceLevelSchema = z.enum(["alto", "moderado", "bajo", "precaucion", "variable"]);

const sourcedString = z.object({
  valor: z.union([z.string().min(1), z.number()]),
  fuentes: z.array(z.string().min(1)).min(1),
});

const sourcedStringList = z.object({
  valor: z.array(z.string().min(1)).min(1),
  fuentes: z.array(z.string().min(1)).min(1),
});

export const marcasSchema = z.object({
  actualizado: z.string().min(1),
  criterio_ranking: z.string().min(1),
  convencion_rotulos_certificaciones: z.record(z.string(), z.string().min(1)),
  nota_registros: z.string().min(1),
  marcas: z
    .array(
      z.object({
        slug: z.string().min(1),
        nombre: z.string().min(1),
        ranking_relevancia: z.number().int().positive(),
        justificacion_ranking: z.string().min(1),
        resumen: z.string().min(1),
        sitio_oficial: sourcedString,
        origen: sourcedString,
        anio_fundacion: sourcedString,
        empresa: sourcedString,
        historia: sourcedString,
        posicionamiento: sourcedString,
        lineas: sourcedStringList,
        productos_estrella: sourcedStringList,
        nota_productos: z.string().min(1).nullable().optional(),
        certificaciones: sourcedStringList,
        mercado_libre: sourcedString,
        otras_tiendas: sourcedStringList,
        redes: z.object({
          valor: z.record(z.string(), z.string().min(1)),
          fuentes: z.array(z.string().min(1)).min(1),
        }),
        categorias: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  excluidas_o_a_revisar: z
    .array(
      z.object({
        nombre: z.string().min(1),
        motivo: z.string().min(1),
        fuentes: z.array(z.string().min(1)).min(1),
      }),
    )
    .optional(),
});

const subcategoriaSchema = z.object({
  slug: z.string().min(1),
  nombre: z.string().min(1),
  url: z.string().min(1),
});

export const taxonomiaSchema = z.object({
  actualizado: z.string().min(1),
  niveles_de_evidencia: z.object({
    alto: z.string().min(1),
    moderado: z.string().min(1),
    bajo: z.string().min(1),
    precaucion: z.string().min(1),
    variable: z.string().min(1),
  }),
  nota_evidencia: z.string().min(1),
  categorias: z
    .array(
      z.object({
        slug: z.string().min(1),
        nombre: z.string().min(1),
        url: z.string().min(1),
        descripcion: z.string().min(1),
        subcategorias: z.array(subcategoriaSchema).min(1),
        nivel_evidencia: evidenceLevelSchema,
        nota_evidencia: z.string().min(1),
        fuentes: z.array(z.string().min(1)).min(1),
        marcas: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  etapas_de_vida: z
    .array(
      z.object({
        slug: z.string().min(1),
        nombre: z.string().min(1),
        url: z.string().min(1),
        descripcion: z.string().min(1),
        enfoque_editorial: z.array(z.string().min(1)).min(1),
        categorias_relacionadas: z.array(z.string().min(1)).min(1),
        fuentes: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  niveles_de_usuario: z
    .array(
      z.object({
        slug: z.string().min(1),
        nombre: z.string().min(1),
      }),
    )
    .min(1),
  marco_regulatorio_argentino: z.object({
    resumen: z.string().min(1),
    implicancias_editoriales: z.array(z.string().min(1)).min(1),
    fuentes: z.array(z.string().min(1)).min(1),
  }),
});

export const homeSchema = z.object({
  placeholders: z.object({
    nombre_portal: z.string().min(1),
    dominio: z.string().min(1),
    nota: z.string().min(1),
  }),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    canonical: z.string().min(1),
    og_site_name: z.string().min(1),
  }),
  h1: z.string().min(1),
  bajada: z.string().min(1),
  intro: z.string().min(1),
  bloques_categorias: z
    .array(
      z.object({
        slug: z.string().min(1),
        titulo: z.string().min(1),
        texto: z.string().min(1),
        nivel_evidencia: evidenceLevelSchema,
        url: z.string().min(1),
      }),
    )
    .min(1),
  bloque_etapas: z.object({
    titulo: z.string().min(1),
    texto: z.string().min(1),
    items: z
      .array(
        z.object({
          slug: z.string().min(1),
          titulo: z.string().min(1),
          texto: z.string().min(1),
          url: z.string().min(1),
        }),
      )
      .min(1),
  }),
  bloque_marcas: z.object({
    titulo: z.string().min(1),
    texto: z.string().min(1),
    items: z
      .array(
        z.object({
          slug: z.string().min(1),
          nombre: z.string().min(1),
          resumen: z.string().min(1),
          url: z.string().min(1),
        }),
      )
      .min(1),
  }),
  faq: z
    .array(
      z.object({
        q: z.string().min(1),
        a: z.string().min(1),
        fuentes: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  disclaimer: z.string().min(1),
  schema_sugerido: z.record(z.string(), z.unknown()),
  criterios_seo_aeo_geo: z.record(z.string(), z.unknown()),
});

export const fichasSchema = z.object({
  actualizado: z.string().min(1),
  placeholders: z.object({
    nombre_portal: z.string().min(1),
    dominio: z.string().min(1),
  }),
  fichas: z
    .array(
      z.object({
        slug: z.string().min(1),
        url: z.string().min(1),
        canonical: z.string().min(1),
        meta: z.object({
          title: z.string().min(1),
          description: z.string().min(1),
        }),
        h1: z.string().min(1),
        intro: z.string().min(1),
        posicionamiento: z.string().min(1),
        historia: z.string().min(1),
        empresa: z.string().min(1),
        anio_fundacion: z.union([z.string().min(1), z.number()]),
        origen: z.string().min(1),
        lineas: z.array(z.string().min(1)).min(1),
        productos_destacados: z.array(z.string().min(1)).min(1),
        nota_productos: z.string().nullable(),
        categorias: z
          .array(
            z.object({
              slug: z.string().min(1),
              nombre: z.string().min(1),
              url: z.string().min(1),
            }),
          )
          .min(1),
        certificaciones: z.array(z.string().min(1)).min(1),
        nota_registros: z.string().min(1),
        donde_comprar: z.object({
          sitio_oficial: z.string().min(1),
          mercado_libre: z.string().min(1),
          otras: z.array(z.string().min(1)),
        }),
        redes: z.record(z.string(), z.string().min(1)),
        faq: z
          .array(
            z.object({
              q: z.string().min(1),
              a: z.string().min(1),
              fuentes: z.array(z.string()).min(1),
            }),
          )
          .min(1),
        fuentes: z.array(z.string().min(1)).min(1),
        schema_sugerido: z
          .object({
            "@type": z.string().min(1),
            name: z.string().min(1),
            url: z.string().min(1),
          })
          .passthrough(),
        disclaimer: z.string().min(1),
      }),
    )
    .min(1),
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  author: z.string().min(1),
  reviewer: z.string().min(1),
  reviewerRole: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha del post tiene que ser AAAA-MM-DD"),
  sources: z.array(z.string().min(1)).min(1),
  evidence: evidenceLevelSchema.optional(),
  ejemplo: z.boolean(),
  category: z.string().min(1).optional(),
  stage: z.string().min(1).optional(),
  readingMinutes: z.number().int().positive(),
  image: z.string().min(1),
  imageCredit: z.string().min(1),
  excerpt: z.string().min(1),
  kicker: z.string().min(1),
  toc: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).min(1),
  faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).default([]),
  relatedProducts: z.array(z.string().min(1)).default([]),
  rail: z.array(z.string().min(1)).default([]),
});

export const affiliateCatalogSchema = z.object({
  aviso: z.string().min(1),
  actualizado: z.string().min(1),
  productos: z
    .array(
      z.object({
        id: z.string().min(1),
        titulo: z.string().min(1),
        marca: z.string().min(1),
        categoria: z.string().min(1),
        subcategoria: z.string().min(1).optional(),
        precioEjemplo: z.number().positive(),
        moneda: z.literal("ARS"),
        ejemplo: z.literal(true),
        etiquetas: z.array(z.string()),
        imagen: z.string().min(1),
        posicion: z.string().min(1),
        url: z.string().url(),
        urlTipo: z.enum(["tienda-oficial", "busqueda-ejemplo"]),
        notaEditorial: z.string().min(1),
        destacado: z.boolean(),
        masVendidoSegunMarca: z.boolean(),
      }),
    )
    .min(1),
});

export type MarcasFile = z.infer<typeof marcasSchema>;
export type Marca = MarcasFile["marcas"][number];
export type Taxonomia = z.infer<typeof taxonomiaSchema>;
export type Categoria = Taxonomia["categorias"][number];
export type Etapa = Taxonomia["etapas_de_vida"][number];
export type HomeFile = z.infer<typeof homeSchema>;
export type FichasFile = z.infer<typeof fichasSchema>;
export type Ficha = FichasFile["fichas"][number];
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type AffiliateCatalogFile = z.infer<typeof affiliateCatalogSchema>;
