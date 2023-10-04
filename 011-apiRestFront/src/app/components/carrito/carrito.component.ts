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
}
