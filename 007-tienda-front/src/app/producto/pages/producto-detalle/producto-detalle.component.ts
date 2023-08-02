import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/model';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent {

  @Input() producto: Producto;
  

  mostrarDetalle :boolean = false;

  cerrarDetalle(){
    console.log("click");
    
    this.mostrarDetalle = false;
    console.log(this.mostrarDetalle);
  }
}
