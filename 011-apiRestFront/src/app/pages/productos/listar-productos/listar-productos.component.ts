import { Component, OnInit } from '@angular/core';
import { Producto } from '../entity/producto';
import { ProductoServiceService } from '../producto.service';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{

  productos: Producto[];

  constructor(private productoService: ProductoServiceService){};

  ngOnInit(): void {
    this.obternerProductos();
  }

  private obternerProductos(){
    this.productoService.obtenerListaProductos().subscribe(dato => {
      this.productos = dato;
    })
  }

}
