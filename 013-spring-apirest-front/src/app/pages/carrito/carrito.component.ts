import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoDTO } from 'src/app/interface/producto-dto';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  //Variables
  listaProductos: ProductoDTO[] = [];
  precioTotalPedido: number = 0;

  constructor(private carritoService: CarritoService, private pedidoService: PedidoService,
              private route: Router){};
  displayedColumns: string[] = ['nombreProducto', 'precioProducto', 'cantidad', 'total'];

  ngOnInit(): void {    
    this.listaProductos = this.carritoService.obtenerListaProductosEnPedido();
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
      next:(data) => {
        Swal.fire({
          title: "Pedido realizado",
          icon: "success",
          timer: 2000,
          showConfirmButton: false, // Ocultar el botón de confirmación
        });
        this.route.navigate(['dashboard']);},
      error: (err) => {console.log("Error al realizar el pedido: ",err);}
    })
  }
}
