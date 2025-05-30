// Formatear precio a pesos mexicanos
export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(precio);
}

// Formatear fecha en formato local (día, mes, año)
export function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(fecha));
}

// Formatear fecha y hora en formato local
export function formatearFechaHora(fecha: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(fecha));
}