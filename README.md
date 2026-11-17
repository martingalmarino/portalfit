# Portal FIT

Portal estático, en español de Argentina, sobre suplementos, nutrición deportiva, longevidad y rendimiento según la etapa de vida. Es informativo: no hace claims médicos. El nombre y el dominio son provisorios y salen de variables de entorno.

## Stack

- Next.js (App Router) y React, con TypeScript estricto y salida estática por `generateStaticParams`.
- Tailwind CSS 4, con los tokens del boceto (papel, verde bosque, latón) y el CSS de componentes en `app/globals.css`.
- `next/font`: Fraunces (itálica en los titulares de display) y Source Sans 3.
- Contenido validado con Zod en el build.
- pnpm.

No hace falta `output: "export"`: en Vercel el sitio se genera estático y `next/image` sigue optimizando. No hay base de datos ni variables secretas obligatorias.

## Arquitectura

```
app/                  rutas, metadata, sitemap, robots, opengraph-image
components/           layout, home, ficha de marca, categoría, blog
content/              JSON de Redacción, fichas .md, blog .md y catálogo de productos
lib/content/          schemas Zod y loaders
lib/affiliates/       interfaz única y proveedor mock
lib/seo.ts            metadata, canónicos y JSON-LD
public/img            fotos de Pexels
public/logos          logos para fondo claro
```

Los loaders (`lib/content/load.ts`) leen los JSON, los validan y cruzan slugs, intros y referencias. Si falta un campo obligatorio, el build corta con la ruta del error. Un valor que todavía no está se oculta: no se muestra un rótulo en su lugar.

JSON-LD: `Organization` y `WebSite` en todo el sitio, `Brand` en las marcas, `ItemList` en listados, `Article` y `FAQPage` en el blog, `BreadcrumbList` en las migas. No hay `Product` ni `Offer`: el sitio no publica precios.

`robots.ts` y la meta robots dejan el sitio en `noindex` / `disallow` hasta que `NEXT_PUBLIC_ALLOW_INDEXING` sea `true`.

## Cómo actualiza Redacción

El copy de marcas, categorías, etapas y home no se reescribe en los componentes. Se cambia el archivo y se manda un pull request.

1. Marcas, taxonomía y home: `content/marcas.json`, `content/taxonomia.json`, `content/home.json`.
2. Ficha de marca: el mismo slug en `content/fichas.json` y `content/fichas/<slug>.md`. La intro del Markdown tiene que coincidir con la intro del JSON (y con el resumen de la home). El build falla si divergen.
3. Guías: un `.md` (o `.mdx`) en `content/blog`, más su entrada en `content/blog/posts.json`. El frontmatter pide título, descripción, slug, fecha (`AAAA-MM-DD`), autor y fuentes (`titulo` + `url`). La categoría puede ser un slug, una lista o no estar. El H1, la bajada, el meta title, la keyword, los H2, los enlaces internos y la FAQ salen de `posts.json`. El canonical de ese archivo no se usa: lo arma `NEXT_PUBLIC_SITE_URL`. Sin imagen, la guía abre con cabecera tipográfica. Si `ejemplo` es `true`, queda fuera del índice, del sitemap y de las páginas.
4. Placeholders: `[NOMBRE PORTAL]` se reemplaza al render. `[dominio]` solo se muestra si existe `NEXT_PUBLIC_DOMAIN_LABEL`.
5. Fotos nuevas: sumar el archivo a `public/img`, el crédito en `content/creditos.md` y la ficha en `lib/photos.ts`. Sin crédito, el build no la acepta.
6. Productos: `content/productos.json`. No lleva precios. Campos:
   - `id`, `titulo`, `marca` (slug), `categoria` (slug), `subcategoria` (slug, si aplica)
   - `url`: URL limpia de la publicación en Mercado Libre. Obligatoria.
   - `affiliateUrl`: link de afiliado ya generado en el generador de Mercado Libre, uno por producto. Opcional. El sitio lo usa tal cual, sin sumar parámetros.
   - `imagen`: archivo de `public/img`, si hay. Si no está, la card usa una foto genérica.
   - `tiendaOficial`: sí o no, si se quiere fijar. Si no está, se infiere de la ficha de la marca.
   - `rne`: sí o no, si aplica. Si no está, se infiere de las certificaciones de la marca.
   El botón dice “Ver precio en Mercado Libre”. Si hay `affiliateUrl`, ese es el destino. Si no, el destino es `url` con `utm_source=portalfit` y `utm_campaign=portalfit`. Una URL de búsqueda (`listado.mercadolibre.com.ar`) se trata como provisoria y se rearma con el título hasta que haya una publicación real.

## Afiliados de Mercado Libre

`getAffiliateProvider()` es la única puerta (`getFeatured`, `getProductsByBrand`, `getProductsByCategory`). Hoy lee el archivo curado. El botón lleva `rel="sponsored nofollow noopener"` y `target="_blank"`. Los links de afiliado no se construyen en el código: vienen en `affiliateUrl`.

## Variables

Copiá `.env.example` a `.env.local` para desarrollar. En Vercel, las mismas claves van en Project Settings → Environment Variables:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Nombre visible. Si no está, se usa `Portal FIT`. |
| `NEXT_PUBLIC_SITE_URL` | Canónico, Open Graph y sitemap. Sin barra final. En Vercel, si falta, se usa `VERCEL_PROJECT_PRODUCTION_URL` y después `VERCEL_URL`. |
| `NEXT_PUBLIC_DOMAIN_LABEL` | Texto del dominio en el pie. Si no está, el pie no muestra dominio. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` hasta el lanzamiento. `true` habilita el indexado. |

## Desarrollo

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Deploy en Vercel

1. Importar el repositorio. Framework: Next.js. El gestor es pnpm (hay `packageManager` en `package.json`).
2. Cargar las variables de arriba. Dejar `NEXT_PUBLIC_ALLOW_INDEXING` en `false` hasta tener dominio y revisión.
3. Deploy. No hace falta configurar build command, output directory ni regiones.
4. Cuando exista el dominio, setear `NEXT_PUBLIC_SITE_URL` con `https://` y volver a desplegar para que canónicos y sitemap apunten ahí.
5. Recién entonces pasar `NEXT_PUBLIC_ALLOW_INDEXING` a `true`.

No se despliega a producción desde este repositorio de etapa 1 sin esa decisión.
