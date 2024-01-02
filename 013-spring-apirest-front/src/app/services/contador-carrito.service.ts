import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContadorCarritoService {

  constructor() { }

  private contadorProductos = 0;

  getContadorProductos() {
    return this.contadorProductos;
  }

  aumentarContador() {
    this.contadorProductos++;
  }

  disminuirContador() {
    this.contadorProductos--;
  }

  reiniciarContador(){
    return this.contadorProductos = 0;
  }
}
