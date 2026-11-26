export const PLANNED_TOOLS = [
  {
    slug: "proteina-diaria",
    nombre: "Calculadora de proteína diaria",
    descripcion: "Estimá tu rango según peso y entrenamiento.",
  },
] as const;

/**
 * La calculadora todavía no existe. Estas rutas siguen publicadas y enlazadas,
 * pero no entran al sitemap hasta que haya herramienta.
 */
export const UNINDEXED_PATHS = [
  "/herramientas",
  ...PLANNED_TOOLS.map((tool) => `/herramientas/${tool.slug}`),
] as const;

export function isUnindexedPath(path: string): boolean {
  return (UNINDEXED_PATHS as readonly string[]).includes(path);
}

export function getPlannedTool(slug: string) {
  return PLANNED_TOOLS.find((tool) => tool.slug === slug);
}
