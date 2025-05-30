import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import EstadoPedido from "./EstadoPedido";
import LineaTiempo from "./LineaTiempo";
import ProductosPedido from "./ProductosPedido";
import { 
  ArrowLeft, 
  Calendar, 
  ChefHat, 
  Check, 
  MapPin, 
  Ban, 
  Truck, 
  ClipboardEdit 
} from "lucide-react";
import { type Pedido } from "@/types/pedido";
import { formatearFecha, formatearPrecio } from "@/lib/format";

interface DetallePedidoProps {
  pedido: Pedido;
  onVolver: () => void;
  onCambiarEstado: (pedidoId: string, nuevoEstado: string) => void;
  onGuardar: (pedido: Pedido) => void;
}

export default function DetallePedido({ 
  pedido, 
  onVolver, 
  onCambiarEstado,
  onGuardar 
}: DetallePedidoProps) {
  // Calcular la fecha de entrega estimada
  const fechaEstimada = new Date(pedido.fechaEstimadaEntrega);
  const ahora = new Date();
  const retrasado = pedido.estado !== 'entregado' && 
                   pedido.estado !== 'cancelado' && 
                   ahora > fechaEstimada;
  
  // Calcular el progreso en porcentaje (pendiente => preparación => en camino => entregado)
  const calcularProgreso = (): number => {
    switch (pedido.estado) {
      case 'pendiente': return 25;
      case 'en preparación': return 50;
      case 'en camino': return 75;
      case 'entregado': return 100;
      case 'cancelado': return 0;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={onVolver}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Pedido #{pedido.id}</h1>
          <EstadoPedido estado={pedido.estado} />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onCambiarEstado(pedido.id, 'en preparación')}
            disabled={pedido.estado === 'en preparación' || 
                     pedido.estado === 'entregado' || 
                     pedido.estado === 'cancelado'}
          >
            <ChefHat className="mr-2 h-4 w-4" />
            En preparación
          </Button>
          <Button
            variant="outline"
            onClick={() => onCambiarEstado(pedido.id, 'en camino')}
            disabled={pedido.estado === 'pendiente' || 
                     pedido.estado === 'en camino' || 
                     pedido.estado === 'entregado' || 
                     pedido.estado === 'cancelado'}
          >
            <Truck className="mr-2 h-4 w-4" />
            En camino
          </Button>
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => onCambiarEstado(pedido.id, 'entregado')}
            disabled={pedido.estado === 'entregado' || 
                     pedido.estado === 'cancelado'}
          >
            <Check className="mr-2 h-4 w-4" />
            Entregado
          </Button>
          <Button
            variant="destructive"
            onClick={() => onCambiarEstado(pedido.id, 'cancelado')}
            disabled={pedido.estado === 'entregado' || 
                     pedido.estado === 'cancelado'}
          >
            <Ban className="mr-2 h-4 w-4" />
            Cancelado
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Progreso del Pedido</CardTitle>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Creado: {formatearFecha(pedido.fecha)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={retrasado ? "border-red-500 text-red-500" : ""}>
                      Entrega estimada: {formatearFecha(fechaEstimada)}
                    </Badge>
                    {retrasado && (
                      <Badge variant="destructive">Retrasado</Badge>
                    )}
                  </div>
                  <span>{calcularProgreso()}%</span>
                </div>
                <Progress value={calcularProgreso()} className="h-2" />
              </div>
              <div className="mt-6">
                <LineaTiempo historial={pedido.historialEstados} />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="productos">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="productos">Productos</TabsTrigger>
              <TabsTrigger value="detalles">Detalles de entrega</TabsTrigger>
            </TabsList>
            <TabsContent value="productos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Productos del pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductosPedido productos={pedido.productos} />
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div></div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Subtotal: {formatearPrecio(pedido.subtotal)}</div>
                    <div className="text-sm text-muted-foreground">Impuestos: {formatearPrecio(pedido.impuestos)}</div>
                    <div className="text-sm text-muted-foreground">Envío: {formatearPrecio(pedido.costoEnvio)}</div>
                    <Separator className="my-2" />
                    <div className="font-bold">Total: {formatearPrecio(pedido.total)}</div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="detalles" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información de entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Dirección de entrega</h3>
                    <div className="mt-2 p-4 bg-muted rounded-md">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p>{pedido.direccionEntrega.calle}, {pedido.direccionEntrega.numero}</p>
                          <p>{pedido.direccionEntrega.ciudad}</p>
                          {pedido.direccionEntrega.referencias && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Referencias: {pedido.direccionEntrega.referencias}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Información del cliente</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nombre:</span>
                          <span className="font-medium">{pedido.cliente.nombre}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Teléfono:</span>
                          <span className="font-medium">{pedido.cliente.telefono}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{pedido.cliente.email}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Método de pago</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tipo:</span>
                          <span className="font-medium capitalize">{pedido.metodoPago.tipo}</span>
                        </div>
                        {pedido.metodoPago.detalles && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Detalles:</span>
                            <span className="font-medium">{pedido.metodoPago.detalles}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {pedido.notas && (
                    <div>
                      <h3 className="text-lg font-medium">Notas</h3>
                      <div className="mt-2 p-4 bg-muted rounded-md">
                        <p>{pedido.notas}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {}} disabled={pedido.estado === 'entregado' || pedido.estado === 'cancelado'}>
                    <ClipboardEdit className="mr-2 h-4 w-4" />
                    Editar información
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna derecha - Resumen e información adicional */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estado</span>
                <EstadoPedido estado={pedido.estado} />
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID del pedido</span>
                <span className="font-medium">#{pedido.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha</span>
                <span className="font-medium">{formatearFecha(pedido.fecha)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">{pedido.productos.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatearPrecio(pedido.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impuestos</span>
                <span>{formatearPrecio(pedido.impuestos)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>{formatearPrecio(pedido.costoEnvio)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatearPrecio(pedido.total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}