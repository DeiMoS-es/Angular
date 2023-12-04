import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //URLS
  private baseUrl = 'http://localhost:8080/productos';

  constructor(private httpClient: HttpClient) { }

  public obtenerProductos():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseUrl}/listarProductos`);
  };

  public eliminarProducto(idProducto: number){
    return this.httpClient.delete(`${this.baseUrl}/eliminar/${idProducto}`);
  }

  public guardarProducto(producto: Producto){
    return this.httpClient.post(`${this.baseUrl}/guardar`, producto);
  }

  public editarProducto(idProducto: number, producto: Producto){
    return this.httpClient.put(`${this.baseUrl}/editar/${idProducto}`, producto);
  }

  public obternerProductoId(idProducto: number){
    return this.httpClient.get<Producto>(`${this.baseUrl}/buscar/${idProducto}`);
  }
}
