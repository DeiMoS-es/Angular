import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'http://localhost:3000/products'; //Puerto 3000, porque es donde se está ejecutando el "Backend" nuestra supuesta "bbdd"

  constructor( private http: HttpClient) { }

  // Un observale es un flujo de datos en el tiempo, en este caso serán productos, parecido a las promesas
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL);
  }
}
