import { Injectable } from '@angular/core';
import { Producto } from '../entity/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listaProductos: Producto[] = [];
  
  constructor() { }

  agregarProducto(producto: Producto) {
    const productoExistente = this.listaProductos.find((p) => p.idProducto === producto.idProducto);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      productoExistente.cantidad++;
    } else {
      // Si el producto no está en el carrito, agrégalo
      producto.cantidad = 1;
      this.listaProductos.push(producto);
    }
  }

  eliminarProducto(idProducto: number) {
    const index = this.listaProductos.findIndex((p) => p.idProducto === idProducto);
    if (index !== -1) {
      this.listaProductos.splice(index, 1);
    }
  }

  obtenerListaProductos() {
    return this.listaProductos;
  }
}
