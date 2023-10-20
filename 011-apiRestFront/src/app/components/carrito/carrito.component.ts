import { Component, Input } from '@angular/core';
import { ProductoDTO } from 'src/app/pages/productos/entity/productoDTO';
import { Producto } from 'src/app/pages/productos/entity/producto';
import { CarritoService } from 'src/app/pages/productos/services/carrito.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  // private listaProductos: Producto[] = [];

  constructor(private carritoService: CarritoService, private route: Router) {}

  listaProductos = this.carritoService.obtenerListaProductos();

  disminuirCantidad(producto: Producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  aumentarCantidad(producto: Producto) {
    producto.cantidad++;
  }

  calcularSubtotal(): number {
    let subtotal = 0;
    for (const producto of this.listaProductos) {
      //calcular el iva del precio
      let precioConIva =
        producto.precioProducto +
        producto.precioProducto * (producto.ivaProducto / 100);
      subtotal += precioConIva * producto.cantidad;
    }
    return subtotal;
  }
  guardarPedido(listaProductos: Producto[]) {
    // Como en el back, recibo un ProductoDTO, necesito mapear mi lista de productos del front, 
    // a la misma estructura DTO que espera recibir el back
    // Mapear la lista de productos a ProductoDTO
    const productosDTO: ProductoDTO[] = listaProductos.map((producto) => {
      return new ProductoDTO(
        producto.idProducto,
        producto.nombreProducto,
        producto.precioProducto,
        producto.ivaProducto,
        producto.stockProducto,
        producto.cantidad
      );
    });
    // En este caso concreto he tenido que usar el .subscribe ya que,
    // En Angular, las solicitudes HTTP son asincrónicas. 
    // Esto significa que necesitas suscribirte al observable devuelto por this.httpClient.post 
    // para que la solicitud se realice efectivamente. 
    this.carritoService.guardarProducto(productosDTO).subscribe(
      response => {
        // Manejar la respuesta del backend si es necesario
        console.log('Pedido guardado con éxito', response);
        Swal.fire({
          title: "Pedido creado con éxito",
          icon: "success",
          timer: 1500, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        });
        this.route.navigate(['/productos']);
      },
      error => {
        // Manejar cualquier error que pueda ocurrir al guardar el pedido
        console.error('Error al guardar el pedido', error);
        Swal.fire({
          title: "Error al guardar el pedido",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
      }
    );
  }
}
