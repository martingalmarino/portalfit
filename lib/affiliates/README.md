# Afiliados de Mercado Libre

La etapa 1 no llama a la API de Mercado Libre. Todo el catálogo sale de `content/ml-mock.json` y cada ítem obliga `ejemplo: true`. Los precios son de ejemplo: no se muestran como ofertas reales y no hay JSON-LD `Product` / `Offer`.

## Interfaz

`getAffiliateProvider()` devuelve:

- `getFeatured(limit?)` — cards de la home, en el orden editorial del mock.
- `getProductsByBrand(slug)` — ficha de marca.
- `getProductsByCategory(slug)` — listado de categoría.

El enlace del botón se arma en `links.ts` con `ML_AFFILIATE_ID` (`matt_word`) y UTM. Si el ID está vacío, el destino sigue siendo el del mock. Los `<a>` llevan `rel="sponsored nofollow noopener"` y `target="_blank"`.

## Cómo enchufar la API real (ISR)

1. Crear `lib/affiliates/mercadolibre.ts` que implemente `AffiliateProvider`.
2. Adentro, `fetch` a la API de afiliados o al recurso de búsqueda oficial, con el token solo en el servidor (nunca `NEXT_PUBLIC_`).
3. Mapear la respuesta al tipo `AffiliateProduct`. Recién cuando el precio venga de esa respuesta, setear un flag de precio real. Hasta ese día, `ejemplo` sigue en `true` y la UI sigue diciendo "Precio de ejemplo".
4. No inventar ítems si la API no devuelve resultados: la sección muestra el estado vacío.
5. En `lib/affiliates/index.ts`, devolver el proveedor real cuando exista `ML_ACCESS_TOKEN` (nombre sugerido) y, si no, seguir con el mock.
6. En las rutas que listen productos (`app/page.tsx`, `app/marcas/[slug]/page.tsx`, `app/categorias/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`) exportar:

```ts
export const revalidate = 3600;
```

Eso revalida con ISR en Vercel sin rebuild. El mock actual es estático y no necesita revalidación.
7. Cuando haya precios reales, ahí sí se puede sumar `Product` / `Offer`. Antes, no.
