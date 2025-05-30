import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import { type Pedido, type ProductoPedido } from "@/types/pedido";
import { PRODUCTOS_DISPONIBLES } from "@/data/productos-mock";
import { formatearPrecio } from "@/lib/format";
import { useForm } from "react-hook-form";

interface NuevoPedidoProps {
  onVolver: () => void;
  onGuardar: (pedido: Pedido) => void;
}

// Creamos un pedido vacío predeterminado
const pedidoNuevoDefault: Omit<Pedido, 'id'> = {
  cliente: {
    nombre: '',
    telefono: '',
    email: '',
  },
  direccionEntrega: {
    calle: '',
    numero: '',
    ciudad: '',
    referencias: '',
  },
  fecha: new Date(),
  fechaEstimadaEntrega: new Date(Date.now() + 35 * 60000), // 35 minutos después
  estado: 'pendiente',
  productos: [],
  metodoPago: {
    tipo: 'efectivo',
    detalles: '',
  },
  subtotal: 0,
  impuestos: 0,
  costoEnvio: 0,
  total: 0,
  notas: '',
  historialEstados: [
    {
      estado: 'pendiente',
      fecha: new Date(),
      usuario: 'Administrador'
    }
  ]
};

export default function NuevoPedido({ onVolver, onGuardar }: NuevoPedidoProps) {
  const [productosSeleccionados, setProductosSeleccionados] = useState<ProductoPedido[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const impuestos = subtotal * 0.16; // 16% de impuestos
  const costoEnvio = subtotal > 0 ? 35 : 0; // Costo de envío fijo si hay productos
  const total = subtotal + impuestos + costoEnvio;

  const form = useForm({
    defaultValues: {
      nombreCliente: '',
      telefonoCliente: '',
      emailCliente: 'barrio.chicken@hotmail.com',
      calle: 'Av. Camilo Henríquez',
      numero: '3692',
      ciudad: 'Santiago',
      referencias: 'Local Barrio Chick´en',
      tipoPago: 'efectivo',
      detallesPago: '',
      notas: '',
    }
  });

  const handleAgregarProducto = () => {
    // Verificamos si hay productos disponibles para agregar
    if (PRODUCTOS_DISPONIBLES.length > 0) {
      const nuevoProducto: ProductoPedido = {
        id: PRODUCTOS_DISPONIBLES[0].id,
        nombre: PRODUCTOS_DISPONIBLES[0].nombre,
        precio: PRODUCTOS_DISPONIBLES[0].precio,
        cantidad: 1
      };
      
      setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
      recalcularTotal([...productosSeleccionados, nuevoProducto]);
    }
  };

  const handleEliminarProducto = (index: number) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos.splice(index, 1);
    setProductosSeleccionados(nuevosProductos);
    recalcularTotal(nuevosProductos);
  };

  const handleCambiarProducto = (index: number, productoId: string) => {
    const productoSeleccionado = PRODUCTOS_DISPONIBLES.find(p => p.id === productoId);
    if (productoSeleccionado) {
      const nuevosProductos = [...productosSeleccionados];
      nuevosProductos[index] = {
        ...nuevosProductos[index],
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio
      };
      setProductosSeleccionados(nuevosProductos);
      recalcularTotal(nuevosProductos);
    }
  };

  const handleCambiarCantidad = (index: number, cantidad: number) => {
    if (cantidad > 0) {
      const nuevosProductos = [...productosSeleccionados];
      nuevosProductos[index] = {
        ...nuevosProductos[index],
        cantidad
      };
      setProductosSeleccionados(nuevosProductos);
      recalcularTotal(nuevosProductos);
    }
  };

  const recalcularTotal = (productos: ProductoPedido[]) => {
    const nuevoSubtotal = productos.reduce(
      (sum, producto) => sum + (producto.precio * producto.cantidad), 
      0
    );
    setSubtotal(nuevoSubtotal);
  };

  const onSubmit = (data: any) => {
    if (productosSeleccionados.length === 0) {
      alert('Debe agregar al menos un producto al pedido');
      return;
    }

    const nuevoPedido: Omit<Pedido, 'id'> = {
      ...pedidoNuevoDefault,
      cliente: {
        nombre: data.nombreCliente,
        telefono: data.telefonoCliente,
        email: data.emailCliente
      },
      direccionEntrega: {
        calle: data.calle,
        numero: data.numero,
        ciudad: data.ciudad,
        referencias: data.referencias
      },
      fecha: new Date(),
      fechaEstimadaEntrega: new Date(Date.now() + 35 * 60000), // 35 minutos después
      estado: 'pendiente',
      productos: productosSeleccionados,
      metodoPago: {
        tipo: data.tipoPago,
        detalles: data.detallesPago
      },
      subtotal,
      impuestos,
      costoEnvio,
      total,
      notas: data.notas,
      historialEstados: [
        {
          estado: 'pendiente',
          fecha: new Date(),
          usuario: 'Administrador'
        }
      ]
    };

    onGuardar(nuevoPedido as Pedido);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={onVolver}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Nuevo Pedido</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda - Productos */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  {productosSeleccionados.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="text-muted-foreground mb-2">No hay productos agregados</div>
                      <Button type="button" onClick={handleAgregarProducto}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar producto
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {productosSeleccionados.map((producto, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border rounded-md">
                          <div className="flex-1">
                            <Select
                              value={producto.id}
                              onValueChange={(value) => handleCambiarProducto(index, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar producto" />
                              </SelectTrigger>
                              <SelectContent>
                                {PRODUCTOS_DISPONIBLES.map((p) => (
                                  <SelectItem key={p.id} value={p.id}>
                                    {p.nombre} - {formatearPrecio(p.precio)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="w-20">
                            <Input
                              type="number"
                              min="1"
                              value={producto.cantidad}
                              onChange={(e) => handleCambiarCantidad(index, parseInt(e.target.value))}
                            />
                          </div>
                          <div className="w-24 text-right">{formatearPrecio(producto.precio * producto.cantidad)}</div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEliminarProducto(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" className="w-full" onClick={handleAgregarProducto}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar producto
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dirección de entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="calle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calle</FormLabel>
                          <FormControl>
                            <Input placeholder="Calle" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ciudad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciudad</FormLabel>
                          <FormControl>
                            <Input placeholder="Ciudad" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referencias"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Referencias</FormLabel>
                          <FormControl>
                            <Input placeholder="Casa blanca, portón negro..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notas adicionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notas"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Instrucciones especiales, preferencias del cliente, etc." 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Columna derecha - Cliente, pago y resumen */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nombreCliente"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del cliente" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telefonoCliente"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+569 XXXXXXXX" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailCliente"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="cliente@ejemplo.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Método de pago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tipoPago"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de pago</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar método de pago" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="efectivo">Efectivo</SelectItem>
                            <SelectItem value="tarjeta">Tarjeta (Terminal)</SelectItem>
                            <SelectItem value="transferencia">Transferencia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="detallesPago"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detalles adicionales</FormLabel>
                        <FormControl>
                          <Input placeholder="Información adicional del pago" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatearPrecio(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impuestos (16%)</span>
                    <span>{formatearPrecio(impuestos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{formatearPrecio(costoEnvio)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatearPrecio(total)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-2">
                    <Button type="submit" className="w-full bg-[#E11D24] hover:bg-red-700">
                      Guardar pedido
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={onVolver}>
                      Cancelar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}