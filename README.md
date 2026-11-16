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
content/              JSON de Redacción, fichas .md, blog .mdx, mock de ML
lib/content/          schemas Zod y loaders
lib/affiliates/       interfaz única y proveedor mock
lib/seo.ts            metadata, canónicos y JSON-LD
public/img            fotos de Pexels
public/logos          logos para fondo claro
```

Los loaders (`lib/content/load.ts`) leen los JSON, los validan y cruzan slugs, intros y referencias. Si falta un campo obligatorio, el build corta con la ruta del error. Un valor `PENDIENTE` se muestra como “Pendiente” y no se rellena.

JSON-LD: `Organization` y `WebSite` en todo el sitio, `Brand` en las marcas, `ItemList` en listados, `Article` y `FAQPage` en el blog, `BreadcrumbList` en las migas. No hay `Product` ni `Offer` mientras los precios sean de ejemplo.

`robots.ts` y la meta robots dejan el sitio en `noindex` / `disallow` hasta que `NEXT_PUBLIC_ALLOW_INDEXING` sea `true`.

## Cómo actualiza Redacción

El copy de marcas, categorías, etapas y home no se reescribe en los componentes. Se cambia el archivo y se manda un pull request.

1. Marcas, taxonomía y home: `content/marcas.json`, `content/taxonomia.json`, `content/home.json`.
2. Ficha de marca: el mismo slug en `content/fichas.json` y `content/fichas/<slug>.md`. La intro del Markdown tiene que coincidir con la intro del JSON (y con el resumen de la home). El build falla si divergen.
3. Guías: un `.mdx` en `content/blog`. El frontmatter pide autor, revisor, fecha (`AAAA-MM-DD`), fuentes, grado de evidencia, minutos de lectura, imagen (un archivo ya creditado en `lib/photos.ts`) y, si corresponde, `ejemplo: true`.
4. Placeholders: `[NOMBRE PORTAL]` y `[dominio]` se reemplazan al render. No los hardcodees.
5. Fotos nuevas: sumar el archivo a `public/img`, el crédito en `content/creditos.md` y la ficha en `lib/photos.ts`. Sin crédito, el build no la acepta.
6. Productos de ejemplo: `content/ml-mock.json`, con `ejemplo: true` y un precio marcado como ejemplo. No cargar precios reales en este archivo.

## Afiliados de Mercado Libre

`getAffiliateProvider()` es la única puerta (`getFeatured`, `getProductsByBrand`, `getProductsByCategory`). Hoy devuelve el mock. Cómo pasar a la API real con ISR está en `lib/affiliates/README.md`.

`ML_AFFILIATE_ID` se agrega como `matt_word` si existe. Si está vacío, el enlace sale igual, sin un ID inventado, con UTM y `rel="sponsored nofollow noopener"`.

## Variables

Copiá `.env.example` a `.env.local` para desarrollar. En Vercel, las mismas claves van en Project Settings → Environment Variables:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Nombre visible. Default de ejemplo: `Portal FIT`. |
| `NEXT_PUBLIC_SITE_URL` | Canónico, Open Graph y sitemap. Sin barra final. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` hasta el lanzamiento. `true` habilita el indexado. |
| `ML_AFFILIATE_ID` | Identificador de afiliado. Puede quedar vacío. |

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
