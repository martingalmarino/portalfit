/** Textos de interfaz tomados de content/paginas/microcopy-global.json. */
export const MICROCOPY = {
  barra: "Algunos links a Mercado Libre pueden ser de afiliado: podemos recibir una comisión",
  barraLink: "Cómo funciona",
  pieBloque:
    "Afiliados. Algunos links a Mercado Libre pueden ser de afiliado: si comprás desde ellos, podemos recibir una comisión. No cambia tu precio. Ninguna marca paga por aparecer ni por su posición.",
  pieEnlace: "Links de afiliado",
  avisoLegal:
    "Aviso. Contenido informativo. No reemplaza la consulta con médicos, nutricionistas u otros profesionales de la salud. Los suplementos dietarios no están destinados a diagnosticar, tratar, curar ni prevenir enfermedades. En Argentina son alimentos regulados por el Código Alimentario Argentino; su registro y control están a cargo del SENASA.",
  cta: "Ver precio en Mercado Libre",
  avisoAfiliado: "Link de afiliado: podemos recibir una comisión.",
  notaPrecio: "Sin precio: lo ves en la publicación.",
  tooltip: "Si comprás desde este link, Mercado Libre puede pagarnos una comisión. Tu precio no cambia.",
  bloqueListado:
    "Algunos links pueden ser de afiliado: si comprás desde ellos, podemos recibir una comisión. No cambia tu precio ni el orden, que es editorial. Precios en Mercado Libre.",
  fichaProductos: "Algunos links pueden ser de afiliado: podemos recibir una comisión. No cambia tu precio.",
  articuloProductos:
    "Mencionarlos no es una recomendación individual. Algunos links pueden ser de afiliado: podemos recibir una comisión. No cambia tu precio.",
  categoriaVacia: "Todavía no sumamos productos de esta categoría.",
  guiaKicker: "Guía rápida",
  guiaPregunta: "¿Concentrada o aislada?",
  guiaTexto:
    "La concentrada que se usa en suplementos deportivos suele tener entre 70 y 80 % de proteína; la aislada pasa del 90 %, con menos lactosa y grasa. Para comparar, fijate en el rótulo cuánta proteína aporta cada porción.",
  guiaFuente: "Fuente: ISSN (Jäger et al., 2017)",
  guiaFuenteUrl: "https://doi.org/10.1186/s12970-017-0177-8",
  tiendaOficial: "Tienda oficial",
  filtroRne: "Marca con RNE consultado en registro oficial",
} as const;

export function mlButtonLabel(titulo: string, afiliado: boolean): string {
  const afiliadoNote = afiliado ? ", link de afiliado" : "";
  return `${MICROCOPY.cta}: ${titulo} (se abre en otra pestaña${afiliadoNote})`;
}
