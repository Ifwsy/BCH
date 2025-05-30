import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { type ProductoPedido } from "@/types/pedido";
import { formatearPrecio } from "@/lib/format";

interface ProductosPedidoProps {
  productos: ProductoPedido[];
}

export default function ProductosPedido({ productos }: ProductosPedidoProps) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No hay productos en este pedido
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead className="text-right">Cantidad</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto, index) => (
          <TableRow key={index}>
            <TableCell>{producto.nombre}</TableCell>
            <TableCell className="text-right">{formatearPrecio(producto.precio)}</TableCell>
            <TableCell className="text-right">{producto.cantidad}</TableCell>
            <TableCell className="text-right">{formatearPrecio(producto.precio * producto.cantidad)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}