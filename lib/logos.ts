export type LogoBox = { w: number; h: number };

export type LogoSpec = {
  src: string;
  card: LogoBox;
  chip: LogoBox;
  hero: LogoBox;
};

/**
 * Fondo claro: variante monocroma cuando existe.
 * Gold Nutrition usa gold-nutrition-mono.png.
 * Pulver usa pulver.png (no hay monocromo).
 * Mervick Lab usa el render monocromo #1B3A2F de los bocetos.
 * Las medidas son la altura óptica del mockup, dentro de contenedores idénticos.
 */
export const BRAND_LOGOS: Record<string, LogoSpec> = {
  "ena-sport": {
    src: "/logos/ena-sport.svg",
    card: { w: 102, h: 46 },
    chip: { w: 35, h: 16 },
    hero: { w: 205, h: 93 },
  },
  gentech: {
    src: "/logos/gentech.png",
    card: { w: 150, h: 22 },
    chip: { w: 70, h: 10 },
    hero: { w: 280, h: 42 },
  },
  "ultra-tech": {
    src: "/logos/ultra-tech.png",
    card: { w: 78, h: 50 },
    chip: { w: 28, h: 18 },
    hero: { w: 130, h: 84 },
  },
  "star-nutrition": {
    src: "/logos/star-nutrition.png",
    card: { w: 128, h: 35 },
    chip: { w: 54, h: 15 },
    hero: { w: 240, h: 66 },
  },
  "optimum-nutrition": {
    src: "/logos/optimum-nutrition-mono.svg",
    card: { w: 133, h: 37 },
    chip: { w: 57, h: 16 },
    hero: { w: 250, h: 70 },
  },
  "mervick-lab": {
    src: "/logos/mervick-lab-mono-render.png",
    card: { w: 150, h: 15 },
    chip: { w: 70, h: 8 },
    hero: { w: 280, h: 28 },
  },
  "gold-nutrition": {
    src: "/logos/gold-nutrition-mono.png",
    card: { w: 128, h: 41 },
    chip: { w: 50, h: 16 },
    hero: { w: 216, h: 70 },
  },
  htn: {
    src: "/logos/htn.svg",
    card: { w: 92, h: 39 },
    chip: { w: 37, h: 16 },
    hero: { w: 160, h: 68 },
  },
  "body-advance": {
    src: "/logos/body-advance.png",
    card: { w: 150, h: 26 },
    chip: { w: 70, h: 12 },
    hero: { w: 260, h: 46 },
  },
  xtrenght: {
    src: "/logos/xtrenght-mono.png",
    card: { w: 147, h: 34 },
    chip: { w: 64, h: 15 },
    hero: { w: 250, h: 58 },
  },
  "one-fit-nutrition": {
    src: "/logos/one-fit-nutrition.png",
    card: { w: 109, h: 43 },
    chip: { w: 48, h: 19 },
    hero: { w: 180, h: 72 },
  },
  pulver: {
    src: "/logos/pulver.png",
    card: { w: 144, h: 35 },
    chip: { w: 61, h: 15 },
    hero: { w: 240, h: 58 },
  },
  nutremax: {
    src: "/logos/nutremax-mono.svg",
    card: { w: 150, h: 19 },
    chip: { w: 70, h: 9 },
    hero: { w: 280, h: 36 },
  },
  granger: {
    src: "/logos/granger-mono.png",
    card: { w: 150, h: 24 },
    chip: { w: 70, h: 11 },
    hero: { w: 260, h: 42 },
  },
};

export function logoFor(slug: string): LogoSpec | undefined {
  return BRAND_LOGOS[slug];
}
