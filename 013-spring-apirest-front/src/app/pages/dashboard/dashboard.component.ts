import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interface/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // variables
  productos: Producto[];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'tipo', 'acciones'];
  productoSeleccionado: Producto | null = null;

  constructor(private productoService: ProductoService, private router: Router, private sharedService: SharedServiceService) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.sharedService.productoSeleccionado$.subscribe(
        (product) => this.productoSeleccionado = product
      )
  }

  private obtenerProductos(){
    this.productoService.obtenerProductos().subscribe(dato => {
      this.productos = dato;
    })
  }

  public verProducto(idProducto: number) {
    // Lógica para ver el producto
    console.log(idProducto);
    this.productoService.obternerProductoId(idProducto).subscribe({
      next: (data) => {
        this.productoSeleccionado = data;
      },
      error: (err) => {console.log(err);}
    })
    //this.router.navigate(['/ver-producto', idProducto]) //Si quisiera crear/navegar a otro component para ver un producto
  }

  public editarProducto(idProducto: number) {
    console.log(idProducto);
    this.router.navigate(['/editar-producto', idProducto]);
  }

  public eliminarProducto(idProducto: number) {
    this.productoService.eliminarProducto(idProducto).subscribe({
      next: (data: any) => {
        console.log("Respuesta del servidor:", data);
        const mensaje = data.mensaje;
        console.log(mensaje);
        Swal.fire({
          title: mensaje,
          icon: "success",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
      });
      },
      error:(err) =>{
        console.log("Error: ", err);
        Swal.fire({
          title: "Error al eliminar el producto",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
      })
      },
      complete:() =>{console.log("Complete"); this.obtenerProductos();}
    });
  }

  public cerrarDetalles(){
    this.productoSeleccionado = null;
  }

}
