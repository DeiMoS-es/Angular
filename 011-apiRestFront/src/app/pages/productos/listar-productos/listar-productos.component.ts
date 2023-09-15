import { Component, OnInit } from '@angular/core';
import { Producto } from '../entity/producto';
import { ProductoServiceService } from '../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{

  productos: Producto[];
  producto: any;

  constructor(private productoService: ProductoServiceService){};

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

}
