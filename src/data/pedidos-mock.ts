import { Pedido } from "@/types/pedido";

// Datos de ejemplo para tests
export const PEDIDOS_MOCK: Pedido[] = [
  {
    id: "1",
    cliente: {
      nombre: "Minuto Verde",
      telefono: "XXX-XXX",
      email: "admvta@minutoverde.cl"
    },
    direccionEntrega: {
      calle: "Av. Camilo Henriquez",
      numero: "3696",
      ciudad: "Santiago",
      referencias: "Entrega local Barrio Chick´en"
    },
    fecha: new Date(Date.now() - 30 * 60000), // 30 minutos atrás
    fechaEstimadaEntrega: new Date(Date.now() + 5 * 60000), // 5 minutos en el futuro
    estado: "en preparación",
    productos: [
      {
        id: "p1",
        nombre: "Empanadas media luna",
        precio: 65,
        cantidad: 2
      },
      {
        id: "p3",
        nombre: "Papas fritas 7MM",
        precio: 45,
        cantidad: 1
      },
      {
        id: "p5",
        nombre: "Pechuga de pollo deshuesada",
        precio: 20,
        cantidad: 2
      }
    ],
    metodoPago: {
      tipo: "efectivo",
      detalles: "Pago exacto"
    },
    subtotal: 215,
    impuestos: 34.4,
    costoEnvio: 35,
    total: 284.4,
    notas: "",
    historialEstados: [
      {
        estado: "pendiente",
        fecha: new Date(Date.now() - 30 * 60000),
        usuario: "Sistema"
      },
      {
        estado: "en preparación",
        fecha: new Date(Date.now() - 20 * 60000),
        usuario: "Carlos Ramírez"
      }
    ]
  },
  {
    id: "2",
    cliente: {
      nombre: "PF",
      telefono: "555-987-6543",
      email: "maria@ejemplo.com"
    },
    direccionEntrega: {
      calle: "Calle Durango",
      numero: "45B",
      ciudad: "Ciudad de México",
      referencias: "Edificio gris, piso 3, depto 302"
    },
    fecha: new Date(Date.now() - 60 * 60000), // 60 minutos atrás
    fechaEstimadaEntrega: new Date(Date.now() - 25 * 60000), // 25 minutos atrás (retrasado)
    estado: "en camino",
    productos: [
      {
        id: "p2",
        nombre: "Alitas picantes (10 pzas)",
        precio: 120,
        cantidad: 1
      },
      {
        id: "p4",
        nombre: "Ensalada César",
        precio: 65,
        cantidad: 1
      }
    ],
    metodoPago: {
      tipo: "tarjeta",
      detalles: "Visa"
    },
    subtotal: 185,
    impuestos: 29.6,
    costoEnvio: 35,
    total: 249.6,
    historialEstados: [
      {
        estado: "pendiente",
        fecha: new Date(Date.now() - 60 * 60000),
        usuario: "Sistema"
      },
      {
        estado: "en preparación",
        fecha: new Date(Date.now() - 50 * 60000),
        usuario: "Carlos Ramírez"
      },
      {
        estado: "en camino",
        fecha: new Date(Date.now() - 30 * 60000),
        usuario: "Ana Martínez"
      }
    ]
  },
  {
    id: "3",
    cliente: {
      nombre: "Girasoles",
      telefono: "555-234-5678",
      email: "roberto@ejemplo.com"
    },
    direccionEntrega: {
      calle: "Av. Coyoacán",
      numero: "1520",
      ciudad: "Ciudad de México",
      referencias: "Frente al parque"
    },
    fecha: new Date(Date.now() - 120 * 60000), // 2 horas atrás
    fechaEstimadaEntrega: new Date(Date.now() - 85 * 60000), // 85 minutos atrás
    estado: "entregado",
    productos: [
      {
        id: "p1",
        nombre: "Pollo frito (2 piezas)",
        precio: 65,
        cantidad: 3
      },
      {
        id: "p6",
        nombre: "Combo familiar",
        precio: 299,
        cantidad: 1
      }
    ],
    metodoPago: {
      tipo: "efectivo",
    },
    subtotal: 494,
    impuestos: 79.04,
    costoEnvio: 0, // Envío gratis por ser mayor a $400
    total: 573.04,
    notas: "Tocar el timbre 3 veces",
    historialEstados: [
      {
        estado: "pendiente",
        fecha: new Date(Date.now() - 120 * 60000),
        usuario: "Sistema"
      },
      {
        estado: "en preparación",
        fecha: new Date(Date.now() - 110 * 60000),
        usuario: "Carlos Ramírez"
      },
      {
        estado: "en camino",
        fecha: new Date(Date.now() - 95 * 60000),
        usuario: "Luis Flores"
      },
      {
        estado: "entregado",
        fecha: new Date(Date.now() - 85 * 60000),
        usuario: "Luis Flores"
      }
    ]
  },
  {
    id: "4",
    cliente: {
      nombre: "Andina",
      telefono: "555-345-6789",
      email: "carmen@ejemplo.com"
    },
    direccionEntrega: {
      calle: "Insurgentes Sur",
      numero: "2140",
      ciudad: "Ciudad de México",
    },
    fecha: new Date(Date.now() - 150 * 60000), // 2.5 horas atrás
    fechaEstimadaEntrega: new Date(Date.now() - 115 * 60000), // 115 minutos atrás
    estado: "cancelado",
    productos: [
      {
        id: "p3",
        nombre: "Papas fritas grandes",
        precio: 45,
        cantidad: 2
      },
      {
        id: "p7",
        nombre: "Hamburguesa de pollo",
        precio: 89,
        cantidad: 1
      }
    ],
    metodoPago: {
      tipo: "transferencia",
      detalles: "Pago en proceso"
    },
    subtotal: 179,
    impuestos: 28.64,
    costoEnvio: 35,
    total: 242.64,
    notas: "Cliente no encontrado en la dirección",
    historialEstados: [
      {
        estado: "pendiente",
        fecha: new Date(Date.now() - 150 * 60000),
        usuario: "Sistema"
      },
      {
        estado: "en preparación",
        fecha: new Date(Date.now() - 140 * 60000),
        usuario: "Carlos Ramírez"
      },
      {
        estado: "en camino",
        fecha: new Date(Date.now() - 125 * 60000),
        usuario: "Ana Martínez"
      },
      {
        estado: "cancelado",
        fecha: new Date(Date.now() - 115 * 60000),
        usuario: "Ana Martínez"
      }
    ]
  },
  {
    id: "5",
    cliente: {
      nombre: "Hellmanns",
      telefono: "555-456-7890",
      email: "fernando@ejemplo.com"
    },
    direccionEntrega: {
      calle: "Paseo de la Reforma",
      numero: "222",
      ciudad: "Ciudad de México",
      referencias: "Oficina 505"
    },
    fecha: new Date(),
    fechaEstimadaEntrega: new Date(Date.now() + 35 * 60000), // 35 minutos en el futuro
    estado: "pendiente",
    productos: [
      {
        id: "p8",
        nombre: "Pollo rostizado entero",
        precio: 189,
        cantidad: 1
      },
      {
        id: "p3",
        nombre: "Papas fritas grandes",
        precio: 45,
        cantidad: 2
      },
      {
        id: "p9",
        nombre: "Ensalada de col",
        precio: 35,
        cantidad: 1
      }
    ],
    metodoPago: {
      tipo: "tarjeta",
      detalles: "Mastercard"
    },
    subtotal: 314,
    impuestos: 50.24,
    costoEnvio: 35,
    total: 399.24,
    historialEstados: [
      {
        estado: "pendiente",
        fecha: new Date(),
        usuario: "Sistema"
      }
    ]
  }
];