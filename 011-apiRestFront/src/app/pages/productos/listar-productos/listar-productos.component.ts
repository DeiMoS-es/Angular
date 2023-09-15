import { Component, OnInit } from '@angular/core';
import { Producto } from '../entity/producto';
import { ProductoServiceService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{

  productos: Producto[];
  producto: any;

  constructor(private productoService: ProductoServiceService, private router: Router){};

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
      Swal.fire("Producto eliminado", mensaje, "warning");
      this.obternerProductos();
      }, (error) => {
        Swal.fire("Error", "Ocurrió un error al eliminar el producto.", "error");
      }
    );
  }

  public buscarProductoId(idProducto: number){
    this.productoService.buscarProductoId(idProducto).subscribe(
      (data) => {
        this.producto = data;
        console.log(this.producto);
      }
    );
  }

  // Función para editar un producto
  editarProducto(id: number) {
    // Navega a la página de edición con el ID del producto
    this.router.navigate(['/editar-producto', id]);
  }

}
