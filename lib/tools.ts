export const PLANNED_TOOLS = [
  {
    slug: "proteina-diaria",
    nombre: "Calculadora de proteína diaria",
    descripcion: "Estimá tu rango según peso y entrenamiento.",
  },
] as const;

export function getPlannedTool(slug: string) {
  return PLANNED_TOOLS.find((tool) => tool.slug === slug);
}
