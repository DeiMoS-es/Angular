import { Injectable } from '@angular/core';
import { Producto } from '../interface/producto';
import { HttpClient } from '@angular/common/http';
import { ProductoDTO } from '../interface/producto-dto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  //Variables
  private listaProductos: ProductoDTO[] = [];
  private baseURLPedidos = "http://localhost:8080/pedidos";

  constructor(private httpClient: HttpClient) { }

  public agregarProductoALista(producto: ProductoDTO): void{
    const productoExisteEnLista = this.listaProductos.find((p) => p.idProducto === producto.idProducto);
    if(productoExisteEnLista){
      productoExisteEnLista.cantidad++;
      producto.stockProducto = producto.stockProducto - producto.cantidad;
    }else{
      producto.cantidad = 1;
      producto.stockProducto = producto.stockProducto - producto.cantidad;
      this.listaProductos.push(producto);
    }
  }

  public obtenerListaProductosEnPedido(): ProductoDTO[]{
    return this.listaProductos;
  }
}
