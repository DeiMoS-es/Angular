import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from 'src/app/interface/producto-dto';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  //Variables
  listaProductos: ProductoDTO[] = [];
  constructor(private carritoService: CarritoService){};
  displayedColumns: string[] = ['nombreProducto', 'precioProducto', 'cantidad', 'total'];

  ngOnInit(): void {
    this.listaProductos = this.carritoService.obtenerListaProductosEnPedido();
  }

  public calcularPrecioTotalProducto(cantidad:number, precio:number){
    return precio * cantidad;
  }
}
