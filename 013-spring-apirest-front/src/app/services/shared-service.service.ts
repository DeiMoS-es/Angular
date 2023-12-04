import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  
  //Variables
  private productoSeleccionadoSource = new Subject<Producto>(); //igual se puede cambiar a un otra tipo que ahora nmismo no recuerdo
  productoSeleccionado$ = this.productoSeleccionadoSource.asObservable();

  constructor() { }

  public actualizarProductoSeleccionado(producto: Producto){
    this.productoSeleccionadoSource.next(producto);
  }
}
