export interface CambioEstado {
  estado: string;
  fecha: Date;
  usuario: string;
}

export interface Cliente {
  nombre: string;
  telefono: string;
  email: string;
}

export interface DireccionEntrega {
  calle: string;
  numero: string;
  ciudad: string;
  referencias?: string;
}

export interface MetodoPago {
  tipo: string;  // efectivo, tarjeta, transferencia
  detalles?: string;
}

export interface ProductoPedido {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface Pedido {
  id: string;
  cliente: Cliente;
  direccionEntrega: DireccionEntrega;
  fecha: Date;
  fechaEstimadaEntrega: Date;
  estado: string;  // pendiente, en preparación, en camino, entregado, cancelado
  productos: ProductoPedido[];
  metodoPago: MetodoPago;
  subtotal: number;
  impuestos: number;
  costoEnvio: number;
  total: number;
  notas?: string;
  historialEstados: CambioEstado[];
}