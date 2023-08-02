import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';
import { Producto } from 'src/app/model';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit{
  dataSource?: any = [];
  displayedColumns: string[] = ['nombreProducto', 'stock', 'precioProducto', 'acciones'];

  productoSeleccionado: any;
  //mostrarDetalle = false;

  constructor(private productoService: ProductoService){}

  ngOnInit(): void {
    this.listarProductos();
  }

  mostrarDetalle(producto: Producto){
    this.productoSeleccionado = producto;
  }
  listarProductos(){
    this.productoService.listarProductos().subscribe(
      productos => {
        this.dataSource = productos;
      }
    )
  }

  eliminar(idProducto: number, nombreProducto: string){
    this.productoService.eliminarProducto(idProducto).subscribe(
      () => {
        Swal.fire("Producto eliminado", `Producto: ${nombreProducto} eliminado con éxito`, "warning");
        this.listarProductos();
      }, (error) => {
        console.log(error);
      }
    )
  }

  buscarPorID(idProducto: number){
    this.productoService.buscarProductoId(idProducto).subscribe(
      producto=>{  
       this.productoSeleccionado = producto;      
        console.log(producto);
      }
    )
  }

  cerrarDetalle(){
    // this.mostrarDetalle = false;
  }
}
