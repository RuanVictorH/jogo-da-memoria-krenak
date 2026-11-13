// Base de dados completa das cartas Krenak com os 4 versos pré-definidos:
// - Grupo 1 (8 pares: 1 a 8)  -> Verso 1 (Grafismo Geométrico Tradicional)
// - Grupo 2 (8 pares: 9 a 16) -> Verso 2 (Guerreira & Onça Pintada)
// - Grupo 3 (8 pares: 17 a 24) -> Verso 3 (Pintura Rio Watu & Onça)
// - Grupo 4 (7 pares: 25 a 31) -> Verso 4 (Homenagem Ailton Krenak)

const KRENAK_CARDS_DATA = [
  // --- GRUPO 1: 8 PARES (Verso 1: Grafismo Geométrico) ---
  {
    id: 1,
    krenak: "Gut",
    portuguese: "Tartaruga",
    category: "Animais",
    krenak_img: "card_01_gut_krenak.png",
    portuguese_img: "card_01_tartaruga_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 2,
    krenak: "Kuparak",
    portuguese: "Onça",
    category: "Animais",
    krenak_img: "card_02_0_krenak.png",
    portuguese_img: "card_02_0_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 3,
    krenak: "Amboók",
    portuguese: "Árvore",
    category: "Natureza & Plantas",
    krenak_img: "card_03_1_krenak.png",
    portuguese_img: "card_03_1_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 4,
    krenak: "Bakãn",
    portuguese: "Pássaro",
    category: "Animais",
    krenak_img: "card_04_2_krenak.png",
    portuguese_img: "card_04_2_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 5,
    krenak: "Dhiüm Dhiüm",
    portuguese: "Gambá",
    category: "Animais",
    krenak_img: "card_05_3_krenak.png",
    portuguese_img: "card_05_3_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 6,
    krenak: "E Ná",
    portuguese: "Siriema",
    category: "Animais",
    krenak_img: "card_06_4_krenak.png",
    portuguese_img: "card_06_4_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 7,
    krenak: "Fûro",
    portuguese: "Flor",
    category: "Natureza & Plantas",
    krenak_img: "card_07_0_krenak.png",
    portuguese_img: "card_07_0_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },
  {
    id: 8,
    krenak: "Gaip",
    portuguese: "Goiaba",
    category: "Alimentos & Frutas",
    krenak_img: "card_08_1_krenak.png",
    portuguese_img: "card_08_1_pt.png",
    back_img: "assets/backs/back_1_geometric.png",
    back_group: 1
  },

  // --- GRUPO 2: 8 PARES (Verso 2: Guerreira & Onça) ---
  {
    id: 9,
    krenak: "Inhame",
    portuguese: "Inhame",
    category: "Alimentos & Frutas",
    krenak_img: "card_09_2_krenak.png",
    portuguese_img: "card_09_2_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 10,
    krenak: "Jãkrim",
    portuguese: "Jabuticaba",
    category: "Alimentos & Frutas",
    krenak_img: "card_10_3_krenak.png",
    portuguese_img: "card_10_3_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 11,
    krenak: "Mitirik",
    portuguese: "Mexerica",
    category: "Alimentos & Frutas",
    krenak_img: "card_11_4_krenak.png",
    portuguese_img: "card_11_4_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 12,
    krenak: "Nat-nat",
    portuguese: "Rato",
    category: "Animais",
    krenak_img: "card_12_0_krenak.png",
    portuguese_img: "card_12_0_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 13,
    krenak: "Õm Õm",
    portuguese: "Gavião",
    category: "Animais",
    krenak_img: "card_13_1_krenak.png",
    portuguese_img: "card_13_1_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 14,
    krenak: "Peião",
    portuguese: "Feijão",
    category: "Alimentos & Frutas",
    krenak_img: "card_14_2_krenak.png",
    portuguese_img: "card_14_2_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 15,
    krenak: "Rakeké",
    portuguese: "Borboleta",
    category: "Animais",
    krenak_img: "card_15_3_krenak.png",
    portuguese_img: "card_15_3_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },
  {
    id: 16,
    krenak: "Thaporot",
    portuguese: "Gafanhoto",
    category: "Animais",
    krenak_img: "card_16_4_krenak.png",
    portuguese_img: "card_16_4_pt.png",
    back_img: "assets/backs/back_2_indigenous_art.png",
    back_group: 2
  },

  // --- GRUPO 3: 8 PARES (Verso 3: Pintura Rio Watu & Onça) ---
  {
    id: 17,
    krenak: "Uati",
    portuguese: "Milho",
    category: "Alimentos & Frutas",
    krenak_img: "card_17_0_krenak.png",
    portuguese_img: "card_17_0_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 18,
    krenak: "Uet Uet",
    portuguese: "Melancia",
    category: "Alimentos & Frutas",
    krenak_img: "card_18_1_krenak.png",
    portuguese_img: "card_18_1_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 19,
    krenak: "Tombek",
    portuguese: "Fogo",
    category: "Elementos & Natureza",
    krenak_img: "card_19_2_krenak.png",
    portuguese_img: "card_19_2_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 20,
    krenak: "Tomiak",
    portuguese: "Lua",
    category: "Elementos & Natureza",
    krenak_img: "card_20_3_krenak.png",
    portuguese_img: "card_20_3_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 21,
    krenak: "Taomeete",
    portuguese: "Vagalume",
    category: "Animais",
    krenak_img: "card_21_4_krenak.png",
    portuguese_img: "card_21_4_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 22,
    krenak: "Ruá Ruá",
    portuguese: "Arara",
    category: "Animais",
    krenak_img: "card_22_0_krenak.png",
    portuguese_img: "card_22_0_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 23,
    krenak: "Pukri",
    portuguese: "Boi/Vaca",
    category: "Animais",
    krenak_img: "card_23_1_krenak.png",
    portuguese_img: "card_23_1_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },
  {
    id: 24,
    krenak: "Marrõne",
    portuguese: "Abóbora",
    category: "Alimentos & Frutas",
    krenak_img: "card_24_2_krenak.png",
    portuguese_img: "card_24_2_pt.png",
    back_img: "assets/backs/back_3_colorful_painting.png",
    back_group: 3
  },

  // --- GRUPO 4: 7 PARES (Verso 4: Homenagem Ailton Krenak) ---
  {
    id: 25,
    krenak: "Kulhino",
    portuguese: "Chocalho",
    category: "Cultura & Objetos",
    krenak_img: "card_25_3_krenak.png",
    portuguese_img: "card_25_3_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  },
  {
    id: 26,
    krenak: "Bitim",
    portuguese: "Gato",
    category: "Animais",
    krenak_img: "card_26_4_krenak.png",
    portuguese_img: "card_26_4_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  },
  {
    id: 27,
    krenak: "Amukiun",
    portuguese: "Nuvem",
    category: "Elementos & Natureza",
    krenak_img: "card_27_0_krenak.png",
    portuguese_img: "card_27_0_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  },
  {
    id: 28,
    krenak: "Anguri",
    portuguese: "Aranha",
    category: "Animais",
    krenak_img: "card_28_1_krenak.png",
    portuguese_img: "card_28_1_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  },
  {
    id: 29,
    krenak: "Grán",
    portuguese: "Cobra",
    category: "Animais",
    krenak_img: "card_29_2_krenak.png",
    portuguese_img: "card_29_2_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  },
  {
    id: 30,
    krenak: "Gón",
    portuguese: "Cachorro",
    category: "Animais",
    krenak_img: "card_30_3_krenak.png",
    portuguese_img: "card_30_3_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  },
  {
    id: 31,
    krenak: "Tepó",
    portuguese: "Sol",
    category: "Elementos & Natureza",
    krenak_img: "card_31_4_krenak.png",
    portuguese_img: "card_31_4_pt.png",
    back_img: "assets/backs/back_4_ailton_krenak.png",
    back_group: 4
  }
];

const KRENAK_CARD_BACKS = [
  {
    group: 1,
    id: "back_1_geometric",
    name: "Grafismo Geométrico Tradicional (Pares 1 a 8)",
    image: "assets/backs/back_1_geometric.png"
  },
  {
    group: 2,
    id: "back_2_indigenous_art",
    name: "Guerreira & Onça Pintada (Pares 9 a 16)",
    image: "assets/backs/back_2_indigenous_art.png"
  },
  {
    group: 3,
    id: "back_3_colorful_painting",
    name: "Pintura Rio Watu & Onça (Pares 17 a 24)",
    image: "assets/backs/back_3_colorful_painting.png"
  },
  {
    group: 4,
    id: "back_4_ailton_krenak",
    name: "Homenagem Ailton Krenak (Pares 25 a 31)",
    image: "assets/backs/back_4_ailton_krenak.png"
  }
];
