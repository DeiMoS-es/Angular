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
}
