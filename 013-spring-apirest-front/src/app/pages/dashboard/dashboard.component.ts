import { Component, OnInit } from '@angular/core';
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

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(){
    this.productoService.obtenerProductos().subscribe(dato => {
      this.productos = dato;
    })
  }

  public verProducto(idPRoducto: number) {
    // Lógica para ver el producto
    console.log(idPRoducto);
  }

  public editarProducto(idPRoducto: number) {
    // Lógica para editar el producto
  }

  public eliminarProducto(idPRoducto: number) {
    this.productoService.eliminarProducto(idPRoducto).subscribe({
      // next:() =>{console.log("Next");},
      error:(err) =>{console.log("Error: ", err);},
      complete:() =>{console.log("Complete"); this.obtenerProductos();}
    });
  }

}
