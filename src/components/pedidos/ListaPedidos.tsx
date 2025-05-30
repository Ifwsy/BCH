import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import EstadoPedido from '@/components/pedidos/EstadoPedido';
import { Eye, MoreHorizontal, Check, ChefHat, Ban } from 'lucide-react';
import { type Pedido } from '@/types/pedido';
import { formatearFecha, formatearPrecio } from '@/lib/format';

interface ListaPedidosProps {
  pedidos: Pedido[];
  onVerPedido: (pedido: Pedido) => void;
  onCambiarEstado: (pedidoId: string, nuevoEstado: string) => void;
}

export default function ListaPedidos({ 
  pedidos, 
  onVerPedido, 
  onCambiarEstado 
}: ListaPedidosProps) {
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');

  const pedidosFiltrados = pedidos.filter(pedido => {
    // Filtrar por búsqueda
    const coincideBusqueda = 
      pedido.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.cliente.telefono.includes(busqueda);
    
    // Filtrar por estado
    const coincideEstado = estadoFiltro === 'todos' || pedido.estado === estadoFiltro;
    
    return coincideBusqueda && coincideEstado;
  });

  // Función para determinar si un pedido está retrasado
  const esPedidoRetrasado = (pedido: Pedido): boolean => {
    if (pedido.estado === 'entregado' || pedido.estado === 'cancelado') {
      return false;
    }
    
    const ahora = new Date();
    const estimadaEntrega = new Date(pedido.fechaEstimadaEntrega);
    return ahora > estimadaEntrega;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Pedidos</CardTitle>
        <CardDescription>
          Gestiona todos los pedidos del local
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar por ID, cliente o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={estadoFiltro}
            onValueChange={setEstadoFiltro}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en preparación">En preparación</SelectItem>
              <SelectItem value="en camino">En camino</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha y hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-[100px] text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No se encontraron pedidos con los filtros aplicados
                  </TableCell>
                </TableRow>
              ) : (
                pedidosFiltrados.map(pedido => (
                  <TableRow 
                    key={pedido.id}
                    className={esPedidoRetrasado(pedido) ? "bg-red-50" : ""}
                  >
                    <TableCell className="font-medium">
                      #{pedido.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{pedido.cliente.nombre}</div>
                        <div className="text-sm text-muted-foreground">{pedido.cliente.telefono}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatearFecha(pedido.fecha)}
                    </TableCell>
                    <TableCell>
                      <EstadoPedido estado={pedido.estado} />
                      {esPedidoRetrasado(pedido) && (
                        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Retrasado
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatearPrecio(pedido.total)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onVerPedido(pedido)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onCambiarEstado(pedido.id, 'en preparación')}
                              disabled={pedido.estado === 'en preparación' || 
                                        pedido.estado === 'entregado' || 
                                        pedido.estado === 'cancelado'}
                            >
                              <ChefHat className="mr-2 h-4 w-4" />
                              <span>En preparación</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onCambiarEstado(pedido.id, 'entregado')}
                              disabled={pedido.estado === 'entregado' || 
                                        pedido.estado === 'cancelado'}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              <span>Entregado</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onCambiarEstado(pedido.id, 'cancelado')}
                              disabled={pedido.estado === 'entregado' || 
                                        pedido.estado === 'cancelado'}
                              className="text-red-600"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              <span>Cancelado</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}