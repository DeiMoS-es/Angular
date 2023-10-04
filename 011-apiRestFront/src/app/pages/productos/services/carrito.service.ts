import { Injectable } from '@angular/core';
import { Producto } from '../entity/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listaProductos: Producto[] = [];
  
  constructor() { }

  agregarProducto(producto: Producto) {
    this.listaProductos.push(producto);
  }

  eliminarProducto(idProducto: number) {
    // Implementa la lógica para eliminar un producto de la lista.
  }

  obtenerListaProductos() {
    return this.listaProductos;
  }
}
