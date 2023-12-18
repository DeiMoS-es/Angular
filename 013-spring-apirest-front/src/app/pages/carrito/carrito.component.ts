import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from 'src/app/interface/producto-dto';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  //Variables
  listaProductos: ProductoDTO[] = [];
  precioTotalPedido: number = 0;

  constructor(private carritoService: CarritoService, private pedidoService: PedidoService){};
  displayedColumns: string[] = ['nombreProducto', 'precioProducto', 'cantidad', 'total'];

  ngOnInit(): void {    
    this.listaProductos = this.carritoService.obtenerListaProductosEnPedido();
    console.log(this.listaProductos);
  }

  public calcularPrecioTotalProducto(cantidad:number, precio:number){
    return precio * cantidad;
  }

  public calcularTotalPedido(listaProductos: ProductoDTO[]): number {
    // Utilizar reduce para sumar el precio total de cada producto
    return listaProductos.reduce((total, producto) => total + this.calcularPrecioTotalProducto(producto.cantidad, producto.precioProducto), 0);
  }

  public confirmarPedido(){
    return this.pedidoService.realizarPedido(this.listaProductos).subscribe({
      next:(data) => {console.log(data);},
      error: (err) => {console.log(err);},
      complete: () => {console.log("complete");}
    })
  }
}
