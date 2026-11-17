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

export const certEstadoSchema = z.enum([
  "verificado",
  "documento",
  "declarado",
  "terceros",
  "inferencia",
  "rotulo",
  "sin_dato",
]);

const certificacionDetalleSchema = z.object({
  estado: certEstadoSchema,
  etiqueta: z.string().min(1),
  texto: z.string().min(1),
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
        certificaciones_detalle: z.array(certificacionDetalleSchema).min(1),
        rne_consultado_sifega: z.boolean(),
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
  fuentes_portada: z.array(z.object({ nombre: z.string().min(1), url: z.string().url() })).min(1),
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
        empresa: z.string().min(1).optional(),
        anio_fundacion: z.union([z.string().min(1), z.number()]),
        origen: z.string().min(1),
        lineas: z.array(z.string().min(1)).min(1),
        productos_destacados: z.array(z.string().min(1)).min(1),
        nota_productos: z.string().nullable().optional(),
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
        certificaciones_detalle: z.array(certificacionDetalleSchema).min(1),
        rne_consultado_sifega: z.boolean(),
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

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha del post tiene que ser AAAA-MM-DD");
const categoryValue = z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]);
const sourceValue = z.union([
  z.string().min(1),
  z.object({ titulo: z.string().min(1), url: z.string().url() }),
]);

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1).optional(),
  fecha: isoDate.optional(),
  date: isoDate.optional(),
  autor: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  categoria: categoryValue.optional(),
  category: categoryValue.optional(),
  fuentes: z.array(sourceValue).optional(),
  sources: z.array(sourceValue).optional(),
  reviewer: z.string().min(1).optional(),
  reviewerRole: z.string().min(1).optional(),
  evidence: evidenceLevelSchema.optional(),
  ejemplo: z.boolean().optional(),
  stage: z.string().min(1).optional(),
  readingMinutes: z.number().int().positive().optional(),
  image: z.string().min(1).optional(),
  imageCredit: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  kicker: z.string().min(1).optional(),
  toc: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).optional(),
  faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).optional(),
  relatedProducts: z.array(z.string().min(1)).optional(),
  rail: z.array(z.string().min(1)).optional(),
});

export const postsIndexSchema = z.object({
  actualizado: z.string().optional(),
  nota: z.string().optional(),
  posts: z.array(
    z
      .object({
        slug: z.string().min(1),
        h1: z.string().min(1),
        bajada: z.string().min(1),
        meta_title: z.string().min(1),
        keyword_objetivo: z.string().min(1).optional(),
        h2: z.array(z.string().min(1)).default([]),
        minutos_lectura: z.number().int().positive().optional(),
        faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).default([]),
        enlaces_internos: z.record(z.string(), z.array(z.string())).optional(),
      })
      .passthrough(),
  ),
});

const affiliateProductSchema = z
  .object({
    id: z.string().min(1),
    titulo: z.string().min(1),
    marca: z.string().min(1),
    categoria: z.string().min(1),
    subcategoria: z.string().min(1).optional(),
    url: z.string().url().optional(),
    url_ml: z.string().url().optional(),
    affiliateUrl: z.string().url().nullable().optional(),
    imagen: z.string().min(1).optional(),
    imagen_url: z.string().url().nullable().optional(),
    posicion: z.string().min(1).optional(),
    etiquetas: z.array(z.string()).default([]),
    destacado: z.boolean().default(false),
    masVendidoSegunMarca: z.boolean().default(false),
    notaEditorial: z.string().optional(),
    tiendaOficial: z.boolean().optional(),
    tienda_oficial: z.boolean().optional(),
    rne: z.boolean().nullable().optional(),
    alternativa: z
      .object({
        url_ml: z.string().url(),
        titulo: z.string().min(1).optional(),
        motivo: z.string().min(1).optional(),
        verificado: z.string().min(1).optional(),
      })
      .optional(),
  })
  .transform((product) => {
    const url = product.url ?? product.url_ml;
    if (!url) {
      throw new Error(`El producto "${product.id}" no tiene url`);
    }
    const imagenUrl =
      product.imagen_url && product.imagen_url.startsWith("https://http2.mlstatic.com/")
        ? product.imagen_url
        : undefined;
    return {
      id: product.id,
      titulo: product.titulo,
      marca: product.marca,
      categoria: product.categoria,
      subcategoria: product.subcategoria,
      url,
      affiliateUrl: product.affiliateUrl ?? undefined,
      imagen: product.imagen,
      imagenUrl,
      posicion: product.posicion,
      etiquetas: product.etiquetas,
      destacado: product.destacado,
      masVendidoSegunMarca: product.masVendidoSegunMarca,
      tiendaOficial: product.tiendaOficial === true || product.tienda_oficial === true,
      rne: product.rne === true ? true : undefined,
      provisional: url.includes("listado.mercadolibre.com.ar"),
    };
  });

export const affiliateCatalogSchema = z.object({
  aviso: z.string().optional(),
  actualizado: z.string().optional(),
  productos: z.array(affiliateProductSchema).min(1),
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
