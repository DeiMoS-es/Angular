import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './entity/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  //URL obtiene el listado de todos los productos en el backend
  private baseURL = "http://localhost:8080/productos";

  constructor(private httpClient: HttpClient) { }

  //Método para obtener los productos
  obtenerListaProductos():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseURL}/todos`);
  }

  
}
