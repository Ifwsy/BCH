import { useState } from 'react';
import ListaPedidos from '@/components/pedidos/ListaPedidos';
import DetallePedido from '@/components/pedidos/DetallePedido';
import NuevoPedido from '@/components/pedidos/NuevoPedido';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { type Pedido } from '@/types/pedido';
import { useToast } from '@/hooks/use-toast';
import { PEDIDOS_MOCK } from '@/data/pedidos-mock';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(PEDIDOS_MOCK);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [mostrarNuevoPedido, setMostrarNuevoPedido] = useState(false);
  const { toast } = useToast();

  const handleVerPedido = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
  };

  const handleVolverALista = () => {
    setPedidoSeleccionado(null);
    setMostrarNuevoPedido(false);
  };

  const handleCambiarEstado = (pedidoId: string, nuevoEstado: string) => {
    const now = new Date();
    const pedidosActualizados = pedidos.map(pedido => {
      if (pedido.id === pedidoId) {
        // Crear una copia profunda para evitar modificar el original
        const pedidoActualizado = {
          ...pedido,
          estado: nuevoEstado,
          historialEstados: [
            ...pedido.historialEstados,
            {
              estado: nuevoEstado,
              fecha: now,
              usuario: 'Administrador'
            }
          ]
        };
        
        // Si estamos viendo este pedido, actualizar el seleccionado también
        if (pedidoSeleccionado?.id === pedidoId) {
          setPedidoSeleccionado(pedidoActualizado);
        }
        
        toast({
          title: "Estado actualizado",
          description: `Pedido #${pedido.id} cambiado a "${nuevoEstado}"`,
        });
        
        return pedidoActualizado;
      }
      return pedido;
    });
    
    setPedidos(pedidosActualizados);
  };

  const handleGuardarPedido = (pedido: Pedido) => {
    if (pedido.id) {
      // Actualizar pedido existente
      const pedidosActualizados = pedidos.map(p => 
        p.id === pedido.id ? pedido : p
      );
      setPedidos(pedidosActualizados);
      toast({
        title: "Pedido actualizado",
        description: `El pedido #${pedido.id} ha sido actualizado correctamente.`,
      });
    } else {
      // Crear nuevo pedido
      const nuevoPedido = {
        ...pedido,
        id: (Math.max(...pedidos.map(p => parseInt(p.id))) + 1).toString(),
        historialEstados: [
          {
            estado: pedido.estado,
            fecha: new Date(),
            usuario: 'Administrador'
          }
        ]
      };
      setPedidos([nuevoPedido, ...pedidos]);
      toast({
        title: "Pedido creado",
        description: `El pedido #${nuevoPedido.id} ha sido creado correctamente.`,
      });
    }
    handleVolverALista();
  };

  const handleNuevoPedido = () => {
    setMostrarNuevoPedido(true);
    setPedidoSeleccionado(null);
  };

  // Renderizado condicional basado en el estado
  if (pedidoSeleccionado) {
    return (
      <DetallePedido 
        pedido={pedidoSeleccionado}
        onVolver={handleVolverALista}
        onCambiarEstado={handleCambiarEstado}
        onGuardar={handleGuardarPedido}
      />
    );
  }

  if (mostrarNuevoPedido) {
    return (
      <NuevoPedido 
        onVolver={handleVolverALista}
        onGuardar={handleGuardarPedido}
      />
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Pedidos</h1>
        <Button onClick={handleNuevoPedido} className="bg-[#E11D24] hover:bg-red-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Pedido
        </Button>
      </div>
      
      <ListaPedidos 
        pedidos={pedidos} 
        onVerPedido={handleVerPedido}
        onCambiarEstado={handleCambiarEstado}
      />
    </div>
  );
}