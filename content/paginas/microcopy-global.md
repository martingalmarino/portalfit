# Microcopy global (barra superior, pie, tarjetas)

| Lugar | Antes | Después |
|---|---|---|
| barra_superior | Enlaces de afiliado de Mercado Libre: podemos recibir una comisión · Cómo nos financiamos | Links de afiliado de Mercado Libre: podemos recibir una comisión · Cómo funciona |
| pie_bloque_afiliados | Afiliados. Algunos enlaces a Mercado Libre son de afiliado: si comprás, Portal FIT puede recibir una comisión, sin costo extra para vos. No cambia el orden ni la evaluación. | Afiliados. Los links a Mercado Libre son de afiliado: si comprás desde ellos, podemos recibir una comisión. No cambia tu precio. Ninguna marca paga por aparecer ni por su posición. |
| pie_enlace | Política de afiliados | Links de afiliado |
| pie_copyright | © 2026 Portal FIT · [dominio] · Términos · Privacidad · Mapa del sitio | © 2026 Portal FIT · Términos · Privacidad · Mapa del sitio |
| bloque_productos_listado | Enlaces de afiliado: si comprás, podemos recibir una comisión sin costo extra para vos. El orden “Relevancia editorial” no depende de comisiones. Fotos ilustrativas. | Links de afiliado: si comprás, podemos recibir una comisión. No cambia tu precio ni el orden, que es editorial. Precios en Mercado Libre. |
| ficha_marca_productos | Enlaces de afiliado: podemos recibir una comisión. | Links de afiliado: podemos recibir una comisión. No cambia tu precio. |
| articulo_blog_productos | Mencionarlos no es una recomendación individual. Enlaces de afiliado: podemos recibir una comisión. | Mencionarlos no es una recomendación individual. Links de afiliado: podemos recibir una comisión. No cambia tu precio. |
| aviso_legal_pie | Aviso. Contenido informativo. No reemplaza la consulta con médicos, nutricionistas u otros profesionales de la salud. Los suplementos dietarios no están destinados a diagnosticar, tratar, curar ni prevenir enfermedades. En Argentina los suplementos dietarios son alimentos regulados por el Código Alimentario Argentino y la ANMAT. | Aviso. Contenido informativo. No reemplaza la consulta con médicos, nutricionistas u otros profesionales de la salud. Los suplementos dietarios no están destinados a diagnosticar, tratar, curar ni prevenir enfermedades. En Argentina son alimentos regulados por el Código Alimentario Argentino; su registro y control están a cargo del SENASA. |
| card_guia_proteinas_M14 | La aislada tiene menos grasa y lactosa por porción; la concentrada suele costar menos. Para la mayoría, la diferencia práctica está en la tolerancia y el precio. [badge: Texto de ejemplo] | La concentrada que se usa en suplementos deportivos suele tener entre 70 y 80 % de proteína; la aislada pasa del 90 %, con menos lactosa y grasa. Para comparar, mirá en el rótulo los gramos de proteína por porción. |

- Tarjeta de producto: CTA “Ver en Mercado Libre”; aviso “Link de afiliado: podemos recibir una comisión.”; nota “Sin precio: lo ves en la publicación.”; badge “Tienda oficial” solo si `tienda_oficial` es true.
- aria-label del botón ML: “Ver {titulo} en Mercado Libre (link de afiliado, se abre en otra pestaña)”
- Tooltip del aviso de afiliado: “Si comprás desde este link, Mercado Libre puede pagarnos una comisión. Tu precio no cambia.”
- Categoría sin productos: “Todavía no sumamos productos de esta categoría.”

## Card M14 (Proteínas · Guía rápida)

- Ubicación: /categorias/proteinas · components/categoria/category-browser.tsx GuideCard()
- Kicker: Guía rápida
- Pregunta: ¿Concentrada o aislada?
- Texto: La concentrada que se usa en suplementos deportivos suele tener entre 70 y 80 % de proteína; la aislada pasa del 90 %, con menos lactosa y grasa. Para comparar, mirá en el rótulo los gramos de proteína por porción.
- Enlace: [Fuente: ISSN (Jäger et al., 2017)](https://doi.org/10.1186/s12970-017-0177-8)
- Nota: Quitar el badge 'Texto de ejemplo'. El enlace actual va a /blog/proteina-despues-de-los-40 (pieza de ejemplo que se reemplaza): cambiarlo por la fuente, porque las subcategorías dan 404 (QA-B02).
