import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/pages/productos/entity/producto';
import { CarritoService } from 'src/app/pages/productos/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  // private listaProductos: Producto[] = [];

  constructor(private carritoService: CarritoService){}
  
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
      let precioConIva = producto.precioProducto + (producto.precioProducto * (producto.ivaProducto/100));
      subtotal += precioConIva * producto.cantidad;
    }
    return subtotal;
  }
}
