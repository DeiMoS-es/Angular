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
      console.log(this.productos);
    })
  }

  public verProducto(producto: any) {
    // Lógica para ver el producto
  }

  public editarProducto(producto: any) {
    // Lógica para editar el producto
  }

  public eliminarProducto(producto: any) {
    // Lógica para eliminar el producto
  }
}
