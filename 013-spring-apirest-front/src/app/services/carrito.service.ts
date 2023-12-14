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

  public agregarProducto(producto: ProductoDTO): void{
    const productoExisteEnLista = this.listaProductos.find((p) => p.idProducto === producto.idProducto);
    if(productoExisteEnLista){
      productoExisteEnLista.cantidad++;
    }else{
      producto.cantidad = 1;
      this.listaProductos.push(producto);
    }
  }

  public obtenerListaProductosEnPedido(): ProductoDTO[]{
    return this.listaProductos;
  }
}
