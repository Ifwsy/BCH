import { Timeline } from "@/components/ui/timeline";
import { 
  Clock, 
  Circle, 
  CheckCircle2, 
  ChefHat, 
  Truck, 
  XCircle 
} from "lucide-react";
import { formatearFechaHora } from "@/lib/format";
import { type CambioEstado } from "@/types/pedido";

interface LineaTiempoProps {
  historial: CambioEstado[];
}

export default function LineaTiempo({ historial }: LineaTiempoProps) {
  // Ordenamos el historial por fecha descendente
  const historialOrdenado = [...historial].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const getIconForEstado = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return Circle;
      case 'en preparación':
        return ChefHat;
      case 'en camino':
        return Truck;
      case 'entregado':
        return CheckCircle2;
      case 'cancelado':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getTitleForEstado = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'Pedido recibido';
      case 'en preparación':
        return 'En preparación';
      case 'en camino':
        return 'En camino';
      case 'entregado':
        return 'Entregado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return estado;
    }
  };

  const getColorForEstado = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'text-gray-500';
      case 'en preparación':
        return 'text-yellow-500';
      case 'en camino':
        return 'text-blue-500';
      case 'entregado':
        return 'text-green-500';
      case 'cancelado':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Timeline>
      {historialOrdenado.map((cambio, index) => {
        const Icon = getIconForEstado(cambio.estado);
        return (
          <Timeline.Item key={index}>
            <Timeline.Point>
              <Icon className={`h-4 w-4 ${getColorForEstado(cambio.estado)}`} />
            </Timeline.Point>
            <Timeline.Content>
              <Timeline.Title>
                {getTitleForEstado(cambio.estado)}
              </Timeline.Title>
              <Timeline.Description className="text-sm text-muted-foreground">
                {formatearFechaHora(cambio.fecha)} por {cambio.usuario}
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}