import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDTO } from '../interface/producto-dto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // Variables
  private baseURLPedidos = "http://localhost:8080/pedidos";

  constructor(private httpClient: HttpClient) { }

  public realizarPedido(listaProdtuctosDTO: ProductoDTO[]){
    return this.httpClient.post(`${this.baseURLPedidos}/guardarPedido`, listaProdtuctosDTO);
  }

  //TODO implementar cuando se tenga el sismeta de usuarios.
  
  public buscarPedidoPorId(idPedido: number){
    return this.httpClient.get(`${this.baseURLPedidos}/buscarPedido/${idPedido}`);
  }

  public eliminarPedidoPorId(idPedido: number){
    return this.httpClient.delete(`${this.baseURLPedidos}/eliminarPedido/${idPedido}`);
  }
}
