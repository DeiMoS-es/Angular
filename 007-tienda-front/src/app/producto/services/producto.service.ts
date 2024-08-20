import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
import baseUrl from './helper';
import { Producto } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private httpClient: HttpClient) { }

  public listarProductos(): Observable<[]>{
    return this.httpClient.get<[]>(`${baseUrl}/listar`);
  }

  public eliminarProducto(idProducto: number){
    return this.httpClient.delete(`${baseUrl}/eliminar/${idProducto}`);
  }

  public buscarProductoID(idProducto: number){
    return this.httpClient.get(`${baseUrl}/buscar/${idProducto}`);
  }

  // public guardarProducto(producto: any){
  //   return this.httpClient.post(`${baseUrl}/guardar`, producto);
  // }

  public guardarProducto(producto: FormData): Observable<any>{
    return this.httpClient.post(`${baseUrl}/guardar`, producto);
  }

  public buscarProductoId(idProducto: number){
    return this.httpClient.get(`${baseUrl}/buscar/${idProducto}`)
  }
}
