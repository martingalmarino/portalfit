# Afiliados de Mercado Libre

El catálogo sale de `content/productos.json`. El sitio no publica precios y no emite JSON-LD `Product` ni `Offer`.

## Campos del producto

- `url`: URL limpia de la publicación. Obligatoria.
- `affiliateUrl`: link ya generado en el generador de Afiliados de Mercado Libre, uno por producto. Opcional. No se le agregan parámetros.
- Si no hay `affiliateUrl`, el botón apunta a `url` (o `url_ml`) con `utm_source=portalfit`, `utm_medium=afiliado` y `utm_campaign=portalfit`. Esos tres valores son fijos: no se suma un id de usuario, de sesión ni un email.
- Una URL de `listado.mercadolibre.com.ar` se considera provisoria y se rearma con el título del producto hasta tener la publicación real.

## Interfaz

`getAffiliateProvider()` devuelve:

- `getFeatured(limit?)` — cards de la home.
- `getProductsByBrand(slug)` — ficha de marca.
- `getProductsByCategory(slug)` — listado de categoría.

`productHref` en `links.ts` elige el destino y no modifica `affiliateUrl`. Los `<a>` llevan `rel="sponsored nofollow noopener"` y `target="_blank"`. El texto del botón es “Ver en Mercado Libre”. El aviso “Link de afiliado” aparece en la tarjeta solo si ese producto trae `affiliateUrl`, y el aviso del listado solo si algún producto del bloque lo trae.
