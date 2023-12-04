import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interface/producto';
import { ProductoService } from 'src/app/services/producto.service';

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

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProductos();
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
    //this.router.navigate(['/ver-producto', idProducto]) //Si quisiera crear otro component para ver un producto
  }

  public editarProducto(idProducto: number) {
    console.log(idProducto);
    this.router.navigate(['/editar-producto', idProducto]);
  }

  public eliminarProducto(idProducto: number) {
    this.productoService.eliminarProducto(idProducto).subscribe({
      // next:() =>{console.log("Next");},
      error:(err) =>{console.log("Error: ", err);},
      complete:() =>{console.log("Complete"); this.obtenerProductos();}
    });
  }

  public cerrarDetalles(){
    this.productoSeleccionado = null;
  }
}
