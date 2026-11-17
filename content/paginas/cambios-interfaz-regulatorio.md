# Cambios de interfaz por la actualización regulatoria (Decreto 697/2026)

_Detectados en /tmp/portalfit-ro (rama cursor/portal-fit-etapa-1-4cb7, commit 3b1289f) y en bocetos-v2. No se editó código._

| Dónde | Texto actual | Texto nuevo |
|---|---|---|
| components/home/home-view.tsx:18 (franja 'cómo trabajamos', ítem 02) | RNE consultado en INAL/ANMAT cuando fue posible, con fecha de búsqueda. | RNE consultado en la base oficial SIFeGA cuando fue posible, con fecha de consulta. |
| components/home/home-view.tsx:19 (ítem 03) | Distinguimos lo verificado, lo declarado por la marca y lo pendiente. | Distinguimos lo consultado en registros oficiales de lo que declara cada marca. |
| components/home/home-view.tsx:102 (chip de fuentes) · bocetos-v2/home.py:12 | ANMAT · CAA → href argentina.gob.ar/anmat | SENASA · CAA → href https://www.boletinoficial.gob.ar/detalleAviso/primera/345309/20260803 (Decreto 697/2026) o el CAA cap. XVII |
| components/layout/site-footer.tsx:120-123 (Aviso) · bocetos-v2/common.py:105 | …son alimentos regulados por el Código Alimentario Argentino y la ANMAT. | …son alimentos regulados por el Código Alimentario Argentino; su registro y control están a cargo del SENASA. |
| components/marca/brand-view.tsx:379 (Antes de comprar) · bocetos-v2/marca.py:61 | …El RNE se puede consultar en el buscador público de INAL/ANMAT. | …Los dos números se pueden consultar en los buscadores públicos de SIFeGA (productos autorizados y establecimientos). |
| bocetos-v2/marca.py:58 (leyenda de estados) | Consultado en INAL/ANMAT | Consultado en SIFeGA |
| bocetos-v2/marca.py:54 (columna fuente de la tabla) | INAL/ANMAT · 16/11/2026 | SIFeGA · 16/11/2026 |
| lib/format.ts:128 CERT_LABEL.verificado (badge) | Verificado | Registro oficial consultado |
| lib/format.ts:130 CERT_LABEL.documento | Documento oficial | Documento oficial (sin cambio) |
| lib/format.ts:133 CERT_LABEL.rotulo | Ver rótulo | En el rótulo |
| app/como-evaluamos/page.tsx:93 (definición de 'verificado') | Hay una fuente que permite contrastarlo. | Lo consultamos en un registro oficial (base SIFeGA) y anotamos la fecha. |
| app/como-evaluamos/page.tsx:92 (definición de 'rótulo') | Hay que leerlo en el envase. No lo damos por verificado. | Figura en el envase y se puede buscar en el buscador público de productos autorizados. No lo consultamos producto por producto. |
| components/categoria/category-browser.tsx:195 (filtro) | Con RNE verificado | Marca con RNE consultado en registro oficial |
| components/blog/mdx.tsx / content/blog (plantilla vieja; los posts nuevos ya están en blog/) | RNPA, RNE y ANMAT: cómo leer el rótulo… / (se consulta en INAL/ANMAT) | Reemplazado por blog/rotulo-suplemento-rnpa-rne.md; quitar los MDX de ejemplo |
| Fichas: pie de 'Registros y certificaciones' (nota_registros, viene de fichas.json) | La consulta pública de INAL busca establecimientos… | Se toma de fichas.json → nota_registros (ya actualizado: SENASA, SIFeGA, registros vigentes, 2 años para rótulos) |
| Fichas: disclaimer (viene de fichas.json) | Cada certificación indica si fue verificada en INAL… | Cada certificación indica si fue consultada en la base oficial SIFeGA… (ya en fichas.json) |

## Cambios de datos que afectan el código

- lib/format.ts parseCertification() lee una etiqueta entre corchetes al inicio ([Verificado INAL…], [Declarado por la marca]…). Esas etiquetas ya no existen: los textos están en lenguaje natural. Usar el campo nuevo certificaciones_detalle (fichas.json y marcas.json): [{estado: verificado|documento|declarado|terceros|inferencia|rotulo|sin_dato, etiqueta, texto}]. Hay dos estados nuevos: 'inferencia' (sugerido: 'Inferencia propia') y 'sin_dato' (sugerido: 'Sin dato verificable'); el estado 'pendiente' ya no aparece en datos públicos.
- lib/affiliates/mock.ts:16 calcula rneVerificado con /\[verific/i sobre marca.certificaciones; con los textos nuevos siempre daría false. Usar marca.rne_consultado_sifega (booleano nuevo en marcas.json y fichas.json). Es un dato de la marca, no del producto: por eso el cambio de texto del filtro.
- productos-ml.json reemplaza a content/ml-mock.json: campos id, titulo, marca, categoria, subcategoria?, url_ml, affiliateUrl (null), imagen_url?, tienda_oficial, rne. Sin precio, sin 'ejemplo'. Quitar 'Precio de ejemplo' y 'Productos y precios de ejemplo' de ml-card, home-view, category-browser, brand-view y article-view. El aviso de afiliado se mantiene (los links de producto son de afiliado): usar los textos de microcopy-global.md (tarjeta_producto.aviso_afiliado, bloque_productos_listado, ficha_marca_productos, articulo_blog_productos). El botón usa affiliateUrl cuando exista; si es null, url_ml.
- home.json: nuevo campo fuentes_portada (nombre + url, sin duplicados) para la franja de fuentes del home (QA-B05). schema_sugerido.Organization ya no trae 'logo'.
