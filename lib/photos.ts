export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  author: string;
  page: string;
};

/** Créditos literales de content/creditos.md. Las fotos son ilustrativas, sin envases de marca. */
export const PHOTOS: Record<string, Photo> = {
  "hero-mujer.jpg": {
    src: "/img/hero-mujer.jpg",
    width: 2600,
    height: 3900,
    alt: "Retrato de una mujer pensativa, fotografía ilustrativa",
    credit: "Foto: Timur Weber / Pexels",
    author: "Timur Weber",
    page: "https://www.pexels.com/photo/woman-standing-and-thinking-8560803/",
  },
  "retrato-hombre.jpg": {
    src: "/img/retrato-hombre.jpg",
    width: 1600,
    height: 2400,
    alt: "Retrato de un hombre de mediana edad, fotografía ilustrativa",
    credit: "Foto: iddea photo / Pexels",
    author: "iddea photo",
    page: "https://www.pexels.com/photo/bearded-middle-aged-man-with-white-mug-in-hand-17297469/",
  },
  "fuerza-mujer.jpg": {
    src: "/img/fuerza-mujer.jpg",
    width: 1600,
    height: 1067,
    alt: "Mujer entrenando fuerza, fotografía ilustrativa",
    credit: "Foto: RDNE Stock project / Pexels",
    author: "RDNE Stock project",
    page: "https://www.pexels.com/photo/healthy-woman-women-sport-6539791/",
  },
  "fuerza-mujer-2.jpg": {
    src: "/img/fuerza-mujer-2.jpg",
    width: 1600,
    height: 1067,
    alt: "Mujer entrenando, fotografía ilustrativa de la etapa 50 a 60",
    credit: "Foto: RDNE Stock project / Pexels",
    author: "RDNE Stock project",
    page: "https://www.pexels.com/photo/healthy-women-strong-fitness-6539857/",
  },
  "tarro-scoop.jpg": {
    src: "/img/tarro-scoop.jpg",
    width: 1600,
    height: 1600,
    alt: "Foto ilustrativa de un envase sin marca con polvo y cuchara",
    credit: "Foto: Supplements On Demand / Pexels",
    author: "Supplements On Demand",
    page: "https://www.pexels.com/photo/white-plastic-container-without-a-label-and-a-pile-of-dry-food-with-a-clear-spoon-13779103/",
  },
  "tarro-scoop-2.jpg": {
    src: "/img/tarro-scoop-2.jpg",
    width: 1600,
    height: 1600,
    alt: "Foto ilustrativa de un envase sin marca junto a polvo",
    credit: "Foto: Supplements On Demand / Pexels",
    author: "Supplements On Demand",
    page: "https://www.pexels.com/photo/instant-cocoa-powder-lying-next-to-white-container-13779108/",
  },
  "polvo-scoop.jpg": {
    src: "/img/polvo-scoop.jpg",
    width: 1600,
    height: 2000,
    alt: "Foto ilustrativa de una cuchara de madera sobre polvo",
    credit: "Foto: Any Melnic / Pexels",
    author: "Any Melnic",
    page: "https://www.pexels.com/photo/wooden-scoop-in-pile-of-grated-coconut-36280935/",
  },
  "mano-scoop.jpg": {
    src: "/img/mano-scoop.jpg",
    width: 1600,
    height: 2399,
    alt: "Foto ilustrativa de una mano con una cuchara de polvo",
    credit: "Foto: Ron Lach / Pexels",
    author: "Ron Lach",
    page: "https://www.pexels.com/photo/hand-holding-spoon-with-powder-8776818/",
  },
  "capsulas-negro.jpg": {
    src: "/img/capsulas-negro.jpg",
    width: 1600,
    height: 1067,
    alt: "Foto ilustrativa de cápsulas sobre fondo oscuro",
    credit: "Foto: Odin Mcraig / Pexels",
    author: "Odin Mcraig",
    page: "https://www.pexels.com/photo/medicine-capsules-on-the-black-background-13534594/",
  },
  "softgels.jpg": {
    src: "/img/softgels.jpg",
    width: 1600,
    height: 2400,
    alt: "Foto ilustrativa de cápsulas blandas",
    credit: "Foto: Nastia Ligrain / Pexels",
    author: "Nastia Ligrain",
    page: "https://www.pexels.com/photo/a-close-up-of-pills-and-pills-on-a-white-surface-27744313/",
  },
  "mano-capsula.jpg": {
    src: "/img/mano-capsula.jpg",
    width: 1600,
    height: 1064,
    alt: "Foto ilustrativa de una mano sosteniendo una cápsula",
    credit: "Foto: Vika Glitter / Pexels",
    author: "Vika Glitter",
    page: "https://www.pexels.com/photo/a-person-s-hand-holding-a-white-and-yellow-capsule-9486071/",
  },
  "frasco-softgels.jpg": {
    src: "/img/frasco-softgels.jpg",
    width: 1600,
    height: 1920,
    alt: "Foto ilustrativa de un frasco sin marca con cápsulas blandas",
    credit: "Foto: Supplements On Demand / Pexels",
    author: "Supplements On Demand",
    page: "https://www.pexels.com/photo/supplements-beside-white-plastic-bottle-14744699/",
  },
  "retrato-hombre-2.jpg": {
    src: "/img/retrato-hombre-2.jpg",
    width: 1600,
    height: 1067,
    alt: "Retrato de un hombre junto a una ventana, fotografía ilustrativa",
    credit: "Foto: Andrew Patrick Photo / Pexels",
    author: "Andrew Patrick Photo",
    page: "https://www.pexels.com/photo/pensive-man-looking-out-window-indoors-40673252/",
  },
  "mano-softgel.jpg": {
    src: "/img/mano-softgel.jpg",
    width: 1600,
    height: 1067,
    alt: "Foto ilustrativa de una mano con comprimidos",
    credit: "Foto: Towfiqu barbhuiya / Pexels",
    author: "Towfiqu barbhuiya",
    page: "https://www.pexels.com/photo/close-up-photo-of-hand-full-of-tablets-12474262/",
  },
};

export const STAGE_PHOTOS: Record<string, string> = {
  "30-39": "retrato-hombre-2.jpg",
  "40-49": "retrato-hombre.jpg",
  "50-60": "fuerza-mujer-2.jpg",
  mujer: "fuerza-mujer.jpg",
  menopausia: "hero-mujer.jpg",
  hombre: "retrato-hombre.jpg",
  sarcopenia: "mano-capsula.jpg",
};

export const CATEGORY_FEATURE_PHOTOS: Record<string, string> = {
  proteinas: "mano-scoop.jpg",
  creatina: "polvo-scoop.jpg",
  "omega-3": "softgels.jpg",
};

export const LINE_PHOTOS = [
  "tarro-scoop-2.jpg",
  "mano-scoop.jpg",
  "frasco-softgels.jpg",
  "softgels.jpg",
  "capsulas-negro.jpg",
  "polvo-scoop.jpg",
  "tarro-scoop.jpg",
  "mano-softgel.jpg",
];

export function photoByFile(file: string): Photo {
  const photo = PHOTOS[file];
  if (!photo) {
    throw new Error(`No hay crédito ni medidas para la foto "${file}". No se inventa una imagen.`);
  }
  return photo;
}
