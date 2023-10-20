import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../entity/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  //URL obtiene el listado de todos los productos en el backend
  private baseURL = "http://localhost:8080/productos";

  constructor(private httpClient: HttpClient) { }

  //Método para obtener los productos
  public obtenerListaProductos():Observable<Producto[]>{
    // Obtiene el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    // Verifica si el token existe
    if (token) {
      console.log("Hay token");
      console.log(token);
      // Agrega el token al encabezado de autorización
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.httpClient.get<Producto[]>(`${this.baseURL}/todos`, {headers});
    }else {
      // En el caso en que no haya un token válido, puedes manejarlo según tus necesidades.
      // En este ejemplo, simplemente rechazamos la solicitud con un observable vacío.
      return new Observable<Producto[]>(observer => {
        observer.next([]);
        observer.complete();
      });    
    }
  }

  //Método para eliminar un producto
  public eliminarProducto(idProducto: number){
    return this.httpClient.delete(`${this.baseURL}/eliminar/${idProducto}`);
  }

  //Método para buscar un producto por ID
  public buscarProductoId(idProducto: number){
    return this.httpClient.get(`${this.baseURL}/buscar/${idProducto}`);
  }

  public editarProducto(idProducto: number,productoActualizado: Producto){
    return this.httpClient.put(`${this.baseURL}/editar/${idProducto}`, productoActualizado);
  }

  public crearProducto(producto: Producto){
    return this.httpClient.post(`${this.baseURL}/guardar`, producto);
  }

  public buscarTiempoReal(nombreProducto: string): Observable<Producto[]>{
    const url = `${this.baseURL}/buscarEnTiempoReal/${nombreProducto}`;
    return this.httpClient.get<Producto[]>(url);
  }

  public buscarPorNombre(nombreProducto: string){
    return this.httpClient.get(`${this.baseURL}/buscarNombre/${nombreProducto}`);
  }
}
