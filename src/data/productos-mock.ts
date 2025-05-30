export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion?: string;
  imagen?: string;
}

export const PRODUCTOS_DISPONIBLES: Producto[] = [
  {
    id: "p1",
    nombre: "Pechuga de pollo deshuesado",
    precio: 180000,
    categoria: "Pollo",
    descripcion: "Caja de 20 Kg de pechuga"
    //Podria agregar el nombre de los proveedores aca
  },
  {
    id: "p2",
    nombre: "Truto ala",
    precio: 170000,
    categoria: "Pollo",
    descripcion: "Alitas sin deshuesar"
  },
  {
    id: "p3",
    nombre: "Papas fritas 7MM",
    precio: 45000,
    categoria: "Fritos",
    descripcion: "Bolsa de papas prefritas"
  },
  {
    id: "p4",
    nombre: "Manteca semiliquida",
    precio: 65000,
    categoria: "Complementos",
    descripcion: "Bidon de 10L"
  },
  {
    id: "p5",
    nombre: "Aros de cebolla",
    precio: 20000,
    categoria: "Fritos",
    descripcion: "Bolsa de aros de cebolla prefritos"
  },
  {
    id: "p6",
    nombre: "Tocino",
    precio: 29000,
    categoria: "Carnes rojas",
    descripcion: "2 Kg de tocino"
  },
  {
    id: "p7",
    nombre: "Empanada media luna",
    precio: 89000,
    categoria: "Fritos",
    descripcion: "Caja de 6 Kg de empanadas congeladas"
  },
  {
    id: "p8",
    nombre: "Lechuga escarola",
    precio: 18000,
    categoria: "Verduras",
    descripcion: "Bolsa de 500g de lechucga"
  },
  {
    id: "p9",
    nombre: "Palta",
    precio: 35000,
    categoria: "Verduras",
    descripcion: "15 Kg de palta"
  },
  {
    id: "p10",
    nombre: "BIB Coca-Cola",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: "10L de coca-cola"
  },
  {
    id: "p11",
    nombre: "Truto deshuesado",
    precio: 180000,
    categoria: "Pollo",
    descripcion: ""
  },
  {
    id: "p12",
    nombre: "Filetillo de pollo",
    precio: 180000,
    categoria: "Pollo",
    descripcion: ""
  },
  {
    id: "p13",
    nombre: "Lechuga variedad",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p14",
    nombre: "Cebolla en pluma",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p15",
    nombre: "Cebolla morada",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p16",
    nombre: "Cilantro",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p17",
    nombre: "Mix coleslaw",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p18",
    nombre: "Aji verde",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p19",
    nombre: "Tomate",
    precio: 35000,
    categoria: "Verduras",
    descripcion: ""
  },
  {
    id: "p20",
    nombre: "BIB Coca-Cola Zero",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p21",
    nombre: "BIB Andifruit",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p22",
    nombre: "BIB Fanta Zero",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p23",
    nombre: "BIB Sprite Zero",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p24",
    nombre: "Coca-Cola 350cc",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p25",
    nombre: "Coca-Cola Zero 350cc",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p26",
    nombre: "Fanta Zero 350cc",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p27",
    nombre: "Sprite Zero 350cc",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p28",
    nombre: "Coca-Cola 1.5 LTS",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p29",
    nombre: "Coca-Cola Zero 1.5 LTS",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p30",
    nombre: "Fanta Zero 1.5 LTS",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p31",
    nombre: "Sprite Zero 1.5 LTS",
    precio: 75000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p32",
    nombre: "Benedictino S/G",
    precio: 55000,
    categoria: "Liquidos",
    descripcion: ""
  },
  {
    id: "p33",
    nombre: "Benedictino C/G",
    precio: 55000,
    categoria: "Liquidos",
    descripcion: ""
  }
  ,
  {
    id: "p34",
    nombre: "Pan brioche grande",
    precio: 55000,
    categoria: "Pan",
    descripcion: ""
  },
  {
    id: "p35",
    nombre: "Pan brioche chico",
    precio: 45000,
    categoria: "Pan",
    descripcion: ""
  },
  {
    id: "p36",
    nombre: "Queso Mozzarella",
    precio: 25000,
    categoria: "Lacteos",
    descripcion: ""
  },
  {
    id: "p37",
    nombre: "Queso Cheddar",
    precio: 20000,
    categoria: "Lacteos",
    descripcion: ""
  },
  {
    id: "p38",
    nombre: "Crema de leche",
    precio: 18000,
    categoria: "Lacteos",
    descripcion: ""
  },
  {
    id: "p39",
    nombre: "Leche entera",
    precio: 23000,
    categoria: "Lacteos",
    descripcion: ""
  },
  {
    id: "p40",
    nombre: "Yogurth",
    precio: 18000,
    categoria: "Lacteos",
    descripcion: ""
  },
  {
    id: "p41",
    nombre: "Vino blanco",
    precio: 30000,
    categoria: "Complementos",
    descripcion: ""
  },
  {
    id: "p42",
    nombre: "Pepinillos dill laminado",
    precio: 25000,
    categoria: "Complementos",
    descripcion: ""
  },
  {
    id: "p43",
    nombre: "Smokey BBQ sauce",
    precio: 60000,
    categoria: "Salsas",
    descripcion: ""
  },
  {
    id: "p45",
    nombre: "Humo liquido",
    precio: 50000,
    categoria: "Complementos",
    descripcion: ""
  },
  {
    id: "p46",
    nombre: "Salsa de soya",
    precio: 22000,
    categoria: "Complementos",
    descripcion: ""
  },
  {
    id: "p47",
    nombre: "Salsa inglesa",
    precio: 22000,
    categoria: "Complementos",
    descripcion: ""
  },
  {
    id: "p48",
    nombre: "Condimento cajun",
    precio: 78000,
    categoria: "Polvos",
    descripcion: ""
  },
  {
    id: "p49",
    nombre: "Apanado crocante",
    precio: 76000,
    categoria: "Polvos",
    descripcion: ""
  },
  {
    id: "p50",
    nombre: "Harina 25 Kg",
    precio: 90000,
    categoria: "Polvos",
    descripcion: ""
  },
  {
    id: "p51",
    nombre: "Empanizador",
    precio: 67000,
    categoria: "Polvos",
    descripcion: ""
  },
  {
    id: "p52",
    nombre: "Cono - Super",
    precio: 34000,
    categoria: "Heladeria",
    descripcion: ""
  },
  {
    id: "p53",
    nombre: "Cono artesanal",
    precio: 33000,
    categoria: "Heladeria",
    descripcion: ""
  },
  {
    id: "p54",
    nombre: "Mayonesa",
    precio: 22000,
    categoria: "Salsas",
    descripcion: ""
  },
  {
    id: "p55",
    nombre: "Ketchup",
    precio: 27000,
    categoria: "Salsas",
    descripcion: ""
  },
  {
    id: "p56",
    nombre: "Mostaza",
    precio: 24000,
    categoria: "Salsas",
    descripcion: ""
  },
  {
    id: "p57",
    nombre: "BBQ",
    precio: 21000,
    categoria: "Salsas",
    descripcion: ""
  },
  {
    id: "p58",
    nombre: "Aji",
    precio: 24000,
    categoria: "Salsas",
    descripcion: ""
  },
  {
    id: "p59",
    nombre: "Vinagre de vino rosado",
    precio: 34000,
    categoria: "Complementos",
    descripcion: ""
  },
  {
    id: "p60",
    nombre: "Tortillas mexicanas gigantes",
    precio: 51000,
    categoria: "Pan",
    descripcion: ""
  }
];