import { Component, OnInit } from '@angular/core';
import { Producto } from '../entity/producto';
import { ProductoServiceService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ContadorCarritoService } from '../services/contador-carrito.service';
import { CarritoService } from '../services/carrito.service';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{
  productos: Producto[];
  producto: any;

  constructor(private productoService: ProductoServiceService, 
              private router: Router, 
              private contadorCarritoService: ContadorCarritoService,
              private carritoService: CarritoService ){};

  ngOnInit(): void {
    this.obternerProductos();
  }

  private obternerProductos(){
    this.productoService.obtenerListaProductos().subscribe(dato => {
      this.productos = dato;
    })
  }

  public eliminarProducto(idProducto: number, nombreProducto: string){
    this.productoService.eliminarProducto(idProducto).subscribe(
      (response: any)=>{
        const mensaje = response.mensaje;
        Swal.fire({
          title: "Producto eliminado",
          icon: "warning",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
        this.obternerProductos();
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: "Error al eliminar el producto",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
      }
    );
  }

  // Función para editar un producto
  editarProducto(id: number) {
    // Navega a la página de edición con el ID del producto
    this.router.navigate(['/editar-producto', id]);
  }

  addProductoV2(idProducto: number){

  }
  addProducto(idProducto: number){    
    this.productoService.buscarProductoId(idProducto).subscribe(
      (data: any) => {
        this.carritoService.agregarProducto(data);
        this.contadorCarritoService.aumentarContador();
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: "Error al añadir el producto al carrito",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
      }
    )
  }
}
