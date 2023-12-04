import { Component, HostListener } from '@angular/core';
import { Producto } from 'src/app/interface/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  //Variables
  nombreProducto: string = '';
  sugerencias: Producto[] = [];
  constructor(private productoService: ProductoService){}

  public busquedaEnTiempoReal(nombreProducto: string){
    if(nombreProducto.length > 1){
      this.productoService.busquedaEnTiempoReal(nombreProducto).subscribe({
        next: (data) => {this.sugerencias = data;},
        error:(err) =>{console.log(err);},   
      });
    }else{
      this.sugerencias = [];
    }
  }

  public buscarElemento(sugerencia: any){
    this.productoService.actualizarProductoSeleccionado(sugerencia);
  }

  public onSubmit(){
    console.log(this.nombreProducto);
  }

  /**
   * decorador @HostListener para escuchar el evento click en todo el documento (document)
   * @param event 
   */
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    // Verificar si el clic fue dentro o fuera de la lista
    if (!targetElement.closest('.mr-100')) {
      // Cerrar la lista
      this.sugerencias = [];
    }
  }
}
