# Verificación de productos-ml.json (QA A09)

_16/11/2026 (America/Cordoba). Uso interno._

**Método:** Mercado Libre bloquea el acceso automatizado desde el box (curl/Apify → /gz/account-verification; WebFetch 403; api.mercadolibre.com 401/403). Cada URL se tomó del catálogo de Google Shopping (herramienta ProductSearch, país AR, filtrada a mercadolibre.com.ar), que devuelve la oferta activa con vendedor mercadolibre.com.ar, título, precio y stock al momento de la consulta. Se descartó toda URL que no viniera de ahí. Se quitaron parámetros de tracking (matt_tool, utm_*, pdp_filters, from=gshop). Se revisó además que el slug de la URL coincidiera con el producto; se descartaron 2 con slug distinto al título (Natural Bronze Natuliv; Mutant N.O., que era Mutant Mass) y 1 duplicado.

**Imágenes:** solo se incluye `imagen_url` cuando era de http2.mlstatic.com y respondió HTTP 200 por curl; las miniaturas de Google (gstatic) se omitieron.

**tienda_oficial:** false en todos; el catálogo no informa el vendedor de cada publicación y ML no se pudo abrir para confirmarlo.

**rne:** null en todos; los RNE verificados en INAL son por establecimiento y no se pudo confirmar en el rótulo de cada publicación qué establecimiento elaboró cada producto.

| id | categoría | título en el catálogo | URL |
|---|---|---|---|
| premium-whey-protein-star-nutrition-2-lb | proteinas | Whey Protein 2 Lbs Star Nutrition Proteina de Suero 907 Grs | https://articulo.mercadolibre.com.ar/MLA-826776325-premium-whey-protein-2-lbs-star-nutrition-platinum-_JM |
| platinum-whey-protein-star-nutrition-3-kg | proteinas | Platinum Whey Protein Star Nutrition | https://www.mercadolibre.com.ar/proteina-platinum-whey-star-nutrition-3-kg-zipper/up/MLAU5912373692 |
| truemade-whey-protein-ena-930-g | proteinas | Ena Whey Protein True Made Banana | https://www.mercadolibre.com.ar/ena-truemade-whey-protein-isolate-concentrate-banana-930g-3c/up/MLAU3313308787 |
| whey-protein-ultra-tech-3-kg | proteinas | Whey Protein X 3 Kg Ultra Tech Proteina De Suero Alta Concentración Real Aporta Aminoácidos Bcca Y Glutamina | https://articulo.mercadolibre.com.ar/MLA-636085138-whey-protein-x-3-kg-ultra-tech-proteina-de-suero-alta-concentracion-real-aporta-aminoacidos-bcca-y-glutamina-_JM |
| whey-gourmet-optimum-nutrition | proteinas | Whey Gourmet Optimum Nutrition | https://www.mercadolibre.com.ar/whey-gourmet-series-25-serv-optimum-nutrition-sabor-cookies-and-cream/p/MLA59111767 |
| creatina-monohidrato-star-nutrition-doypack-300-g | creatina | Star Nutrition Creatina Monohidratada Doypack X 300G + Vaso 600ml | https://www.mercadolibre.com.ar/creatina-monohidrato-star-nutrition-300g-con-vaso-batidor/up/MLAU3995160504 |
| creatina-micronizada-ena-300-g | creatina | Suplemento Dietario Ena Creatina Micronizada Sabor a Fruit Punch x 300 g | https://www.mercadolibre.com.ar/ena-creatina-monohidrato-fruit-punch-doypack-300g-3c/up/MLAU3321238090 |
| creatine-monohydrate-optimum-nutrition-100-capsulas | creatina | Creatina monohidrato Optimum Nutrition | https://www.mercadolibre.com.ar/optimum-nutrition-creatine-monohydrate-capsulas-100uds/up/MLAU5371097114 |
| creatine-ultra-tech-150-g | creatina | Ultratech Creatine 150 G | https://www.mercadolibre.com.ar/creatina-pura-ultra-tech-150-grspotencia-fuerza-energia-sabor-sin-sabor/p/MLA18614894 |
| creatina-power-micronizada-body-advance-300-g | creatina | Body Advance Creatina Power Micronizada 300g Lima Limón | https://www.mercadolibre.com.ar/creatina-micronizada-body-advance-power-en-polvo-de-300-g-sabor-lima-limon/p/MLA69614956 |
| pre-workout-wild-gentech-400-g | pre-entrenos | Pre Workout Wild Gentech 400gr Pre Entreno Rendimiento | https://www.mercadolibre.com.ar/pre-workout-wild-gentech-400gr-pre-entreno-rendimiento/up/MLAU3532170316 |
| pre-n-o-explosive-energy-xp-ultra-tech | pre-entrenos | Ultratech Pre N.o. Explosive Energy Xp | https://www.mercadolibre.com.ar/ultra-tech-pre-entrenamiento-pre-no-explosive-energy-xp-sabor-frutos-rojos-x-390g-suplemento-en-polvo/p/MLA19700875 |
| pre-n-o-explosive-ripped-ultra-tech-360-g | pre-entrenos | Suplemento Dietario Ultra Tech Pre N.o. Explosive Ripped x 360 g | https://www.mercadolibre.com.ar/pre-entreno-quemador-pre-no-ripped-ultra-tech-45-serv-sabor-frutos-rojos/p/MLA20727018 |
| tnt-dynamite-star-nutrition | pre-entrenos | Star Nutrition Tnt Dynamite | https://www.mercadolibre.com.ar/tnt-dynamite-star-nutrition-x-240-gr-pre-entreno-sabor-acai/up/MLAU342664094 |
| bcaa-4000-gentech | aminoacidos | Gentech Bcaa 4000 | https://www.mercadolibre.com.ar/bcaa-4000-gentech-120comp-aminoacidos-ramificado-sin-tacc-tr/up/MLAU3351351199 |
| amino-7600-gentech-150-comprimidos | aminoacidos | Amino 7600 Gentech | https://www.mercadolibre.com.ar/aminoacidos-gentech-7600-150-comp-crecimiento-muscular/up/MLAU5173484939 |
| glutamina-star-nutrition-300-g | aminoacidos | Glutamina Star Nutrition | https://www.mercadolibre.com.ar/suplemento-en-polvo-star-nutrition-glutamina-en-pote-de-300g-sin-sabor/p/MLA19532608 |
| glutamina-body-advance-300-g | aminoacidos | Body Advance Glutamina 300g | https://www.mercadolibre.com.ar/glutamina-body-advance-x-300gr-sin-sabor/up/MLAU5806626110 |
| hmb-star-nutrition-180-capsulas-pack-x-2 | aminoacidos | Star Nutrition Hmb Hidroxy Beta Metilbutarato 180 Cap X 2 Un | https://www.mercadolibre.com.ar/star-nutrition-hmb-hidroxy-beta-metilbutarato-180-cap-x-2-un/up/MLAU5177356866 |
| colageno-hidrolizado-star-nutrition | colageno | Colágeno Hidrolizado Star Nutrition Sabor Frutos Rojos | https://www.mercadolibre.com.ar/colageno-hidrolizado-x210-gr-suplemento-sabor-frutos-rojos-star-nutrition/p/MLA53171528 |
| collagen-plus-star-nutrition-360-g | colageno | Star Nutrition Collagen Plus Limón 360gr | https://www.mercadolibre.com.ar/colageno-plus-limon-360g-star-nutrition-calcio-zinc/up/MLAU5306572693 |
| collagen-sport-star-nutrition-360-g | colageno | Star Nutrition Collagen Sport Naranja 360 Gr | https://www.mercadolibre.com.ar/colageno-sport-naranja-360g-star-nutrition-cafeina/up/MLAU5346727512 |
| collagen-bebible-gentech-360-g | colageno | Collagen Bebible x 360 Gr Gentech | https://www.mercadolibre.com.ar/colageno-hidrolizado--resveratrol--q10--vitamina-c/up/MLAU251412804 |
| multivitamin-gentech-60-comprimidos | vitaminas-minerales | Gentech Multivitamin 60 Comprimidos | https://www.mercadolibre.com.ar/multivitaminico-gentech-multi-vitamin-60-comp-tr/up/MLAU3785098228 |
| vitamin-gold-multivitaminico-gold-nutrition-30-capsulas | vitaminas-minerales | Gold Vitamin Gold Suplemento Multivitamínico X 30c | https://www.mercadolibre.com.ar/gold-nutrition-vitamin-gold-30-servicios/up/MLAU5348218584 |
| vitaminas-k2-d3-gold-nutrition-90-comprimidos | vitaminas-minerales | GoldNutrition Vitamin D3 + K2 | https://www.mercadolibre.com.ar/vitaminas-k2--d3-vegetal-gold-nutrition-90-comp-sin-tacc/up/MLAU1155628853 |
| vitamina-d-natuliv-linea-de-ena | vitaminas-minerales | Natuliv Vitamina D | https://www.mercadolibre.com.ar/natuliv-suplemento-vitaminico-vitamina-d-30-comprimidos-ena/up/MLAU3995099296 |
| triple-inmunidad-natuliv-linea-de-ena-30-comprimidos | vitaminas-minerales | Natuliv Triple Inmunidad x 30 Comprimidos | https://www.mercadolibre.com.ar/x30comp-triple-inmunidad-natuliv/p/MLA35392766 |
| zma-ultra-tech-90-capsulas | vitaminas-minerales | Ultra Tech Zma Suplemento Para Masa Muscular X 90 Cápsulas – Sin | https://www.mercadolibre.com.ar/zma-suplemento-para-masa-muscular-ultra-tech-x-90-capsulas-ayuda-a-acelerar-el-proceso-de-crecimiento-muscular/up/MLAU172377894 |
| fish-oil-omega-3-ena-60-capsulas-blandas | omega-3 | ENA Fish Oil omega 3 | https://www.mercadolibre.com.ar/omega-3-ena--fish-oil-epa--dha--60-capsulas-blandas/up/MLAU4994132544 |
| omega-3-fish-oil-gold-nutrition-30-capsulas | omega-3 | Omega 3 Gold Nutrition Fish Oil 30 Capsulas | https://www.mercadolibre.com.ar/omega-3-fish-oil-dha--epa-gold-nutrition-30-capsulas/up/MLAU5114112920 |
| omega-3-natuliv-linea-de-ena-30-capsulas | omega-3 | Natuliv Omega 3 Cápsulas x 30 | https://www.mercadolibre.com.ar/natuliv-omega-3-x30-caps/up/MLAU5195943333 |
| omega-3-fish-oil-gold-nutrition-30-capsulas-pack-x-2 | omega-3 | Omega 3 Fish Oil Dha & Epa Cap X 30 Gold Nutrition Pack X 2 | https://www.mercadolibre.com.ar/omega-3-fish-oil-dha--epa-cap-x-30-gold-nutrition-pack-x-2/up/MLAU3347291907 |
| citrato-de-magnesio-gentech-250-g | magnesio | Citrato de Magnesio Gentech X 250g | https://www.mercadolibre.com.ar/citrato-de-magnesio-gentech-en-polvo-de-250g-con-100-porciones/p/MLA72057076 |
| citrato-de-magnesio-star-nutrition-60-capsulas | magnesio | Star Nutrition Citrato de Magnesio 500grs X 60 Capsulas | https://www.mercadolibre.com.ar/citrato-de-magnesio-60-caps-star-nutrition-sin-tacc/up/MLAU386018344 |
| glicinato-de-magnesio-gold-nutrition-60-capsulas | magnesio | Glicinato de Magnesio 800 Mg 60 Caps Gold Nutrition Sin Sabor | https://www.mercadolibre.com.ar/glicinato-magnesio-gold-nutrition-60cap--descanso-relajacion/up/MLAU5402086276 |
| magnesio-active-natuliv-linea-de-ena-60-capsulas | magnesio | Magnesio Active 60 Caps Natuliv Sin Tacc | https://www.mercadolibre.com.ar/magnesio-active-natuliv-citrato-de-magnesio-140mg-elemental-60-capsulas-suplemento-metabolismo-energetico-funcion-muscular-sistema-nervioso-cansancio-y-fatiga-vegano-sin-gluten/p/MLA80248674 |
| nad-gold-nutrition-30-capsulas | longevidad-bienestar | Nad Gold Nutrition 30 Caps | https://www.mercadolibre.com.ar/gold-nutrition-nad-vitamina-b3-ribosa-suplemento-30c/up/MLAU3915295539 |
| resveratrol-500-star-nutrition-60-capsulas | longevidad-bienestar | Star Nutrition Resveratrol 500 X 60 Cápsulas | https://www.mercadolibre.com.ar/resveratrol-500-x60-caps-star-nutrition-antioxidante-oferta/up/MLAU169163925 |
| curcuma-y-jengibre-natuliv-linea-de-ena-pack-x-3 | longevidad-bienestar | Caja 81 - 3 Cajas Cúrcuma Jengibre Natuliv Articulaciones Tr | https://www.mercadolibre.com.ar/caja-81--3-cajas-curcuma-jengibre-natuliv-articulaciones-tr/up/MLAU3767630518 |
| l-carnitina-star-nutrition-60-capsulas | quemadores-termogenicos | L-carnitina X 60caps Star Nutrition | https://www.mercadolibre.com.ar/suplemento-carnitina-star-n-quemador-grasa-entreno--energia/up/MLAU3426770522 |
| l-carnitina-tartrato-1500-gentech-90-capsulas | quemadores-termogenicos | Carnitina 90 Cápsulas Gentech | https://www.mercadolibre.com.ar/lcarnitina-tartrato-gentech-1500-90-capsulas/up/MLAU4004034957 |
| l-carnitina-ultra-tech-60-capsulas | quemadores-termogenicos | Ultra Tech Suplemento Dietario L-Cartinina x 60 un | https://www.mercadolibre.com.ar/lcarnitina-ultra-tech-60-capsulas/up/MLAU5439497928 |
| hydroxy-max-ena-120-tabletas | quemadores-termogenicos | Hydroxy Max (120 Tabs) Ena Termogénico Descenso De Peso | https://www.mercadolibre.com.ar/hydroxy-max-120-tabs-ena-termogenico-descenso-de-peso/up/MLAU2859926576 |
| ultra-mass-ena-3-kg | ganadores-de-peso | Ena Ultra Mass Weight Gainer 3kg | https://www.mercadolibre.com.ar/ena-ultra-mass-weight-gainer-3kg/up/MLAU4881431477 |
| gainer-ultra-tech-1-5-kg | ganadores-de-peso | Tech Ultra Weight Gainer | https://www.mercadolibre.com.ar/gainer-ultra-tech-x-15-kg-ganador-de-masa-muscular-y-peso-sabor-vainilla/p/MLA22733770 |
| maxi-gain-gentech-1-25-kg | ganadores-de-peso | Gentech Maxi Gain Ganador de Masa | https://articulo.mercadolibre.com.ar/MLA-918407905-maxi-gain-125-kg-gentech-con-proteina-whey-y-carbohidratos-_JM |
| mutant-mass-star-nutrition-1-5-kg | ganadores-de-peso | Star Nutrition Mutant N.o | https://articulo.mercadolibre.com.ar/MLA-777000203-ganador-de-masa-muscular-mutant-mass-15-kg-star-nutrition-_JM |
| iron-bar-gentech-caja-x-20 | barras-snacks | Iron Bar Protein Barras Proteicas Gentech 20 u | https://articulo.mercadolibre.com.ar/MLA-1140562823-iron-bar-gentech-barras-proteicas-20x46g-cu-sin-tacc-_JM |
| snack-bar-gentech | barras-snacks | Gentech Snack Bar | https://www.mercadolibre.com.ar/barra-proteica-snack-bar-coco-gentech-40-grs-x-10u/up/MLAU3809250605 |
| protein-bar-ultra-tech-50-g | barras-snacks | Ultra Tech Protein Bar Sabor 50 Gr | https://www.mercadolibre.com.ar/barra-de-proteina-ultra-tech-de-frutilla-pack-por-12-unidades/p/MLA28016229 |
| creatine-protein-bar-ultra-tech-50-g-caja-x-12 | barras-snacks | Ultratech Creatine Protein Bar 50 G X 12 unidades | https://www.mercadolibre.com.ar/barra-ultra-tech-creatine-protein-chocolate-12-de-50-g/up/MLAU5396602527 |
| muscle-bar-ultra-tech-100-g-caja-x-12 | barras-snacks | Barras Proteicas Muscle Bar Ultra Tech 100 G Caja X 12 | https://www.mercadolibre.com.ar/barras-proteicas-muscle-bar-ultra-tech-100-g-caja-x-12-sabor-chocolate/p/MLA44457713 |
| electrolitos-ena-225-g | hidratacion-electrolitos | Electrolitos Ena 225g Hidratacion Recuperacion V/ Sabores Tr | https://www.mercadolibre.com.ar/electrolitos-ena-225g-hidratacion-recuperacion-v-sabores-tr/up/MLAU4400441727 |
| carbo-energy-ena-bebida-isotonica-546-g | hidratacion-electrolitos | Ena Sport Carbo Energy Bebida Isotonica Blueberry 546g 6c | https://www.mercadolibre.com.ar/ena-sport-carbo-energy-bebida-isotonica-blueberry-546g-6c/up/MLAU4158783962 |
| hydroplus-endurance-star-nutrition-700-g | hidratacion-electrolitos | Star Nutrition Hydroplus Endurance 700 Gr | https://www.mercadolibre.com.ar/hydroplus-bebida-deportiva-blue-razz-700g-star-nut/up/MLAU5306601189 |
| rehydra-tech-isotonica-ultra-tech-700-g | hidratacion-electrolitos | Ultra Tech Rehydra Tech Isotonica En Polvo X 700g Naranja | https://www.mercadolibre.com.ar/ultra-tech-rehydra-tech-isotonica-en-polvo-x-700g-naranja/p/MLA67204818 |
| electrolyte-capsules-ultra-tech | hidratacion-electrolitos | Ultratech Ultra Tech Electrolyte Capsules | https://www.mercadolibre.com.ar/suplemento-en-capsula-ultra-tech-recuperacion-y-rehidratacion-sales-y-minerales-electrolyte-sin-sabor-de-60-un/p/MLA43772726 |
| liquid-energy-gel-ultra-tech-60-g-caja-x-12 | geles-carbohidratos | Liquid Energy Gel Ultra Tech 60 Gr - Caja X 12 Unidades Sabor Frutilla | https://www.mercadolibre.com.ar/liquid-energy-gel-ultra-tech-60-gr-caja-x-12-unidades-sabor-frutilla/p/MLA43878221 |
| energy-gel-con-cafeina-ultra-tech-32-g-caja-x-12 | geles-carbohidratos | Ultra Tech Energy Gel Con Cafeína 32 G | https://www.mercadolibre.com.ar/energy-gel-con-cafeina-ultra-tech-32-gr-caja-x-12-unidades-sabor-vainilla/p/MLA43780285 |
| enargy-gel-ena-sin-cafeina-caja-x-12 | geles-carbohidratos | Suplemento Deportivo Enargy Gel Sabor | https://articulo.mercadolibre.com.ar/MLA-1436006734-enargy-gel-sin-cafeina-ena-12unidades-_JM |
| energy-gel-mervick-lab-caja-x-12 | geles-carbohidratos | Suplemento Deportivo Energy Gel Mervick Sabor Naranja | https://www.mercadolibre.com.ar/mervick-energy-gel-repositor-energetico-sabor-naranja-12u-3c/up/MLAU450833169 |
| iron-gel-gentech-x-6 | geles-carbohidratos | GENTECH Iron Gel Bcaa AFA x 6 | https://articulo.mercadolibre.com.ar/MLA-2230245574-iron-gel-suplemento-gentech-x6-energia-explosiva-gimnasio-_JM |
