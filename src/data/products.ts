export type Variation = {
  model?: string;
  size?: string;
  color?: string;
  extras?: string[];
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  priceFrom: number;
  images: string[];
  description: string;
  popular?: boolean;
  variations?: {
    models?: string[];
    sizes?: string[];
    colors?: string[];
    extras?: string[];
  };
};

export const products: Product[] = [
  {
    id: "1",
    slug: "tapete-flor",
    title: "Tapete Flor",
    category: "Tapetes",
    priceFrom: 120,
    images: ["/placeholder/tapete-1.jpg"],
    description: "Tapete artesanal com motivo de flor.",
    popular: true,
    variations: {
      models: ["Circular", "Oval"],
      sizes: ["P", "M", "G"],
      colors: ["Rosa", "Roxo", "Amarelo"],
      extras: ["Nome bordado"],
    },
  },
  {
    id: "2",
    slug: "amigurumi-urso",
    title: "Amigurumi Urso",
    category: "Amigurumi (bichinhos de crochê)",
    priceFrom: 80,
    images: ["/placeholder/amigurumi-1.jpg"],
    description: "Urso amigurumi feito à mão.",
    popular: true,
    variations: {
      models: ["Clássico", "Com laço"],
      sizes: ["15cm", "25cm"],
      colors: ["Rosa", "Roxo", "Amarelo"],
      extras: ["Nome bordado"],
    },
  },
  {
    id: "3",
    slug: "chaveiro-heart",
    title: "Chaveiro Coração",
    category: "Chaveiros",
    priceFrom: 20,
    images: ["/placeholder/chaveiro-1.jpg"],
    description: "Chaveiro de crochê em formato de coração.",
    variations: {
      colors: ["Rosa", "Roxo", "Amarelo"],
    },
  },
  {
    id: "4",
    slug: "biquini-croche",
    title: "Biquíni de Crochê",
    category: "Biquini",
    priceFrom: 150,
    images: ["/placeholder/biquini-1.jpg"],
    description: "Biquíni artesanal de crochê.",
    variations: {
      sizes: ["P", "M", "G"],
      colors: ["Rosa", "Roxo", "Amarelo"],
    },
  },
  {
    id: "5",
    slug: "saida-de-praia",
    title: "Saída de Praia",
    category: "Saidas de praias",
    priceFrom: 180,
    images: ["/placeholder/saida-1.jpg"],
    description: "Saída de praia em crochê, leve e elegante.",
    variations: {
      sizes: ["P", "M", "G"],
      colors: ["Branco", "Rosa", "Roxo"],
    },
  },
  {
    id: "6",
    slug: "supla-croche",
    title: "Suplá de Crochê",
    category: "Suplá",
    priceFrom: 25,
    images: ["/placeholder/supla-1.jpg"],
    description: "Suplá artesanal para mesa posta.",
    variations: {
      models: ["Redondo", "Quadrado"],
      colors: ["Rosa", "Roxo", "Amarelo"],
    },
  },
  {
    id: "7",
    slug: "bolsa-croche",
    title: "Bolsa de Crochê",
    category: "Bolsa",
    priceFrom: 130,
    images: ["/placeholder/bolsa-1.jpg"],
    description: "Bolsa artesanal de crochê.",
    variations: {
      models: ["Tote", "Transversal"],
      colors: ["Rosa", "Roxo", "Amarelo"],
    },
  },
  {
    id: "8",
    slug: "touca-croche",
    title: "Touca de Crochê",
    category: "Touca",
    priceFrom: 60,
    images: ["/placeholder/touca-1.jpg"],
    description: "Touca de crochê confortável.",
    variations: {
      sizes: ["Infantil", "Adulto"],
      colors: ["Rosa", "Roxo", "Amarelo"],
    },
  },
  {
    id: "9",
    slug: "guirlanda-bebe",
    title: "Guirlanda Porta de Quarto Bebê",
    category: "Guirlanda para colocar em porte de quarto de bebe",
    priceFrom: 200,
    images: ["/placeholder/guirlanda-1.jpg"],
    description: "Guirlanda personalizada para porta de quarto de bebê.",
    variations: {
      models: ["Menina", "Menino"],
      extras: ["Nome bordado"],
      colors: ["Rosa", "Roxo", "Amarelo"],
    },
  },
];