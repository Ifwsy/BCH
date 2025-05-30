import { Badge } from "@/components/ui/badge";

interface EstadoPedidoProps {
  estado: string;
}

export default function EstadoPedido({ estado }: EstadoPedidoProps) {
  switch (estado.toLowerCase()) {
    case 'pendiente':
      return (
        <Badge variant="outline" className="border-gray-400 text-gray-700 bg-gray-100">
          Pendiente
        </Badge>
      );
    case 'en preparación':
      return (
        <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-100">
          En preparación
        </Badge>
      );
    case 'en camino':
      return (
        <Badge variant="outline" className="border-blue-400 text-blue-700 bg-blue-100">
          En camino
        </Badge>
      );
    case 'entregado':
      return (
        <Badge variant="outline" className="border-green-400 text-green-700 bg-green-100">
          Entregado
        </Badge>
      );
    case 'cancelado':
      return (
        <Badge variant="outline" className="border-red-400 text-red-700 bg-red-100">
          Cancelado
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">{estado}</Badge>
      );
  }
}