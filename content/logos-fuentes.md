# Logos oficiales — Portal FIT (etapa 1)

Catorce marcas, en el orden de `marcas.json`. Cada archivo oficial se bajó de una fuente oficial y se abrió para comprobar que es el logo de la marca. No se redibujó ni se inventó ningún logotipo. Donde el original venía en WebP se convirtió a PNG o JPG sin cambiar el tamaño nativo.

Fondo de referencia de la hoja de contactos: `#F6F3EE`. En `contacto.jpg` (1600 × 1154 px) todos los logos van en contenedores idénticos, sin recuadros oscuros. Para las versiones oficiales blancas se usa, cuando existe, una variante oficial en color u oscura; si no hay, una versión monocroma derivada `#1B3A2F` (solo se reemplazó el color de los píxeles o trazos blancos).

## Tabla de fuentes (archivo principal de cada marca)

| Marca | Archivo | Formato | Dimensiones | URL exacta de origen | Tipo de fuente | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| ENA Sport | `ena-sport.svg` | SVG | viewBox 185 × 84 | https://www.enasport.com/cdn/shop/files/logo-ena-negro.svg?v=1790019973 | Sitio oficial | Logo del header compacto, versión negra para fondo claro. El mismo sitio publica `logo-ena-blanco.svg` (header sobre fondo oscuro) y un PNG sin fondo de 2386 × 1087 px (`ENA_SPORT_Sin_Fondo_…png`). |
| Gentech | `gentech.png` | PNG (convertido desde WebP) | 405 × 115 | https://www.gentech.com.ar/web/image/website/1/logo/Gentech%C2%AE?unique=89c0be0 | Sitio oficial | Wordmark negro del header (Odoo). El endpoint no entregó un original más grande: 405 px cumple el mínimo de 400 px. Hay una versión blanca de alta resolución en el mismo sitio: https://www.gentech.com.ar/web/image/13586-49a90f20/GENTECH%20LOGO%20BLANCO.png (1545 × 310, para fondo oscuro). |
| Ultra Tech | `ultra-tech.png` | PNG | 500 × 500 | https://ultratechnutrition.com/2026v2/wp-content/uploads/2026/03/ultra-500x500-1.png | Sitio oficial | Logo actual del header (caja negra, tipografía dorada y franja «Advanced Technology in Sports Nutrition»). El `og:image` del sitio es una versión más chica del mismo isotipo (250 × 160): `LOGO_RECORTADO_flat_70PX-1.png`. |
| Star Nutrition | `star-nutrition.png` | PNG | 3314 × 1119 | https://starnutrition.com.ar/cdn/shop/files/logo-2.png?v=1665590270&format=png | Sitio oficial | Logo del header en Shopify. Se pidió `format=png` porque, sin ese parámetro, el CDN devolvía WebP. |
| Optimum Nutrition | `optimum-nutrition.svg` | SVG | viewBox 750,83 × 210,94 | https://www.optimumnutrition.com/cdn/shop/files/on-logo-white.svg?v=1743174124 | Sitio oficial | Logo del header, **versión blanca para fondo oscuro**. No hay SVG negro o color en el sitio oficial. Ver variante derivada `optimum-nutrition-mono.svg`. |
| Mervick Lab | `mervick-lab.png` | PNG | 933 × 178 | https://d2eebw31vcx88p.cloudfront.net/mervick/uploads-r/configs/394911f97be74da8b61bc988cade22b45106ceae.png | Sitio oficial | Logo del header (`logo_menu`), **versión blanca + «LAB» rojo, para fondo oscuro**. La variante oficial en color está en `mervick-lab-color.png`. |
| Gold Nutrition | `gold-nutrition.png` | PNG (convertido desde WebP) | 216 × 71 | https://www.goldnutrition.com.ar/imagenes/logo_web_gold_nutrition.webp | Sitio oficial | Logo completo del header (isotipo G + wordmark «GOLD NUTRITION SPORTS SUPPLEMENTS»). **Baja resolución: 216 px de ancho**. La tienda oficial de Mercado Libre publica el isotipo G solo, en 1200 × 1200, sobre fondo negro. |
| HTN (High Tech Nutrition) | `htn.svg` | SVG | viewBox 723,79 × 309,79 | https://htn.com.ar/wp-content/uploads/2026/05/htn-logo.svg | Sitio oficial | Logo actual del header (mayo 2026), badge «HTN» negro sobre fondo transparente. |
| Body Advance | `body-advance.png` | PNG | 340 × 62 | https://bodyadvancenutrition.com/wp-content/uploads/2020/03/body-advance-logo.png | Sitio oficial | Logo del header. **Nativo de 340 px de ancho**. No hay SVG ni variante @2x. Sin tienda oficial de la marca en Mercado Libre. |
| Xtrenght Nutrition | `xtrenght.png` | PNG | 486 × 111 | https://xtrenght-nutrition.com/uploads/settings/1581790487-logo_xtrenght_2019.png | Sitio oficial | Logo del header (2019), **versión blanca para fondo oscuro**. El favicon del sitio y la foto de perfil de Facebook oficial son el isotipo cuadrado blanco sobre violeta (127 × 127 en el sitio; 842 × 842 en Facebook). No hay wordmark oficial oscuro para fondo claro. Ver `xtrenght-mono.png`. |
| One Fit Nutrition | `one-fit-nutrition.png` | PNG | 250 × 100 | https://tiendaxnutrition.com/cdn/shop/t/7/assets/xn-logo-one-fit.png | Sitio oficial | Logo de la marca en el sitio oficial de X-Nutrition (a `onefitnutrition.com.ar` redirige ahí). **Nativo de 250 px de ancho**. |
| Pulver | `pulver.png` | PNG (recorte con transparencia) | 1340 × 335 | Derivado de https://http2.mlstatic.com/D_NQ_NP_896610-MLA96155780445_102025-OO.webp | Recorte (origen: ML oficial) | **Recorte del banner oficial**, sin redibujar el logotipo: se pasó a transparente el fondo plateado del banner (umbral de luminancia, se conservaron los trazos y el tramado de la V). El original sin recortar está en `pulver-ml-banner.jpg`. El sitio oficial https://www.pulver.com.ar/ sigue sin cargar (error SSL/HTTP2; HTTP 500). La foto de perfil de Facebook oficial (`pulversuplementos`) es solo una P blanca sobre negro, no el wordmark. En Wayback 2017 del sitio oficial hay un logo ovalado anterior, de 357 × 151. |
| Nutremax | `nutremax.svg` | SVG | viewBox 358,68 × 45,05 | https://nutremax.com.ar/img/nutremax-footer.svg | Sitio oficial | Wordmark oficial del pie, **versión blanca para fondo oscuro**. El header usa un SVG inline (también blanco) con el eslogan «Potenciá tu esfuerzo». La foto de perfil de Facebook oficial es el monograma «NX» blanco sobre negro, no el wordmark. Ver `nutremax-mono.svg`. |
| Granger Nutrición | `granger.png` | PNG | 576 × 231 | https://acdn-us.mitiendanube.com/stores/001/681/926/themes/common/logo-101701789636847418-1777916836-2280be0ec3eb0da01fb754b81b6f0d411777916836.png?0 | Sitio oficial | Logo del header en Tiendanube, **versión blanca para fondo oscuro** («GRANGER.»). El sitio no publica una variante negra del wordmark. La tienda oficial de Mercado Libre sí tiene un isotipo oficial oscuro «G.» sobre blanco, de 870 × 870: https://http2.mlstatic.com/D_NQ_NP_888336-MLA80585362528_112024-F.jpg (no reemplaza al wordmark). Ver `granger-mono.png`. |

## Variantes (oficiales o derivadas)

| Marca | Archivo | Qué es | Origen | Observaciones |
| --- | --- | --- | --- | --- |
| Pulver | `pulver-ml-banner.jpg` | Original oficial | ML oficial (banner de cabecera, 1920 × 621) | Mismo archivo que se usó como fuente del recorte. URL: https://http2.mlstatic.com/D_NQ_NP_896610-MLA96155780445_102025-OO.webp (convertido de WebP a JPEG). |
| Optimum Nutrition | `optimum-nutrition-mono.svg` | **Derivado** | A partir del SVG oficial blanco | Se reemplazó `fill:#ffffff` por `#1B3A2F`. No se redibujaron trazos. En el sitio oficial no hay versión oscura. La tienda oficial de Mercado Libre tiene un raster negro del mismo isologo, pero está muy pixelado y con artefactos (https://http2.mlstatic.com/D_NQ_NP_934903-MLA111001944623_042026-F.jpg); no se usó. La foto de perfil de Facebook oficial es el monograma «ON» blanco sobre negro (2000 × 2000), no el wordmark completo ni una versión para fondo claro. |
| Mervick Lab | `mervick-lab-color.png` | **Oficial** | Sitio oficial (logo del checkout) | Versión en color (azul + rojo) para fondo claro, 200 × 40: https://d2eebw31vcx88p.cloudfront.net/mervick/uploads-r/configs/e939d11c97c67925df3c96cd36243401c5a2b410.png. Baja resolución. Es la que se muestra en `contacto.jpg`. No se generó monocromo porque existe esta variante oficial. |
| Xtrenght | `xtrenght-mono.png` | **Derivado** | A partir del PNG oficial blanco | Se reemplazó el RGB de los píxeles blancos por `#1B3A2F` y se conservó el canal alfa (incluye el antialiasing). No se redibujó. |
| Nutremax | `nutremax-mono.svg` | **Derivado** | A partir del SVG oficial blanco | Se reemplazó `fill:#FFFFFF` por `#1B3A2F`. No se redibujaron trazos. |
| Granger Nutrición | `granger-mono.png` | **Derivado** | A partir del PNG oficial blanco | Se reemplazó el RGB de los píxeles blancos por `#1B3A2F` y se conservó el canal alfa. No se redibujó. El isotipo oficial oscuro «G.» de la tienda de Mercado Libre se documenta arriba; no es el wordmark. |

## Qué es oficial y qué es derivado

**Oficiales (archivo principal o variante):** los 14 logos de la tabla principal, más `mervick-lab-color.png` y `pulver-ml-banner.jpg`.

**Derivados (sin redibujar):**

- `pulver.png`: recorte del fondo plateado del banner oficial de Mercado Libre. El sitio oficial sigue caído; no apareció un PNG con transparencia ni un SVG en redes, packaging o kit de prensa.
- `optimum-nutrition-mono.svg`, `xtrenght-mono.png`, `nutremax-mono.svg`, `granger-mono.png`: monocromos `#1B3A2F` obtenidos solo cambiando el color de los trazos o píxeles blancos.

Tres archivos oficiales no llegan a los 400 px de ancho porque ese es el tamaño nativo y no apareció una variante más grande: Gold Nutrition (216), One Fit Nutrition (250) y Body Advance (340). `mervick-lab-color.png` mide 200 × 40.

## Método

1. Se recorrió el HTML del sitio oficial de cada marca (header, favicon de alta resolución, apple-touch-icon; `og:image` solo si era el logo).
2. Si el sitio bloqueaba (Pulver), se pasó a la tienda oficial de Mercado Libre y, en un segundo intento, a las fotos de perfil de las páginas oficiales de Facebook y a una nueva prueba del sitio (sigue sin cargar).
3. No se usaron bancos de logos ni Wikipedia.
4. Antes de dar por bueno cada archivo se abrió y se comprobó a ojo que era el logo de esa marca.

## Actualización 16/11/2026 — Gold Nutrition para fondo claro

Se buscó una versión oficial para fondo claro antes de generar nada:

- Sitio oficial (https://www.goldnutrition.com.ar/): solo publica `imagenes/logo_web_gold_nutrition.webp` (216 × 71, wordmark «NUTRITION / SPORTS SUPPLEMENTS» en blanco) y `imagenes/logo-gold-icono.webp` (isotipo). Se probaron variantes de nombre (negro, dark, footer, png): todas 404.
- Tienda oficial de Mercado Libre (https://www.mercadolibre.com.ar/tienda/gold-nutrition): logo de tienda `https://http2.mlstatic.com/D_NQ_NP_736566-MLA108181977433_032026-F.jpg` (isotipo G sobre negro) y banners con el logo sobre fondo negro. Ninguna versión para fondo claro.
- Redes oficiales (instagram.com/goldnutritionar, facebook.com/goldnutritionarg): no devolvieron imagen accesible sin sesión.

Resultado: **no hay versión oficial para fondo claro**. Se generó `gold-nutrition-mono.png` (216 × 71) a partir de `gold-nutrition.png` (fuente: https://www.goldnutrition.com.ar/imagenes/logo_web_gold_nutrition.webp), cambiando **solo los píxeles blancos o casi blancos** (mín. RGB ≥ 170 y diferencia entre canales ≤ 28; 1.889 píxeles) a `#1B3A2F` y conservando el alfa. El isotipo y el wordmark «GOLD» en dorado y el filete rojo quedan como en el original. No se redibujó nada. Uso: renders sobre fondo claro de Portal FIT. Sigue siendo de baja resolución (216 px); conviene el kit de prensa para producción.
