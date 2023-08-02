import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import {Producto} from '../../../model';

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css']
})
export class GuardarProductoComponent {

  producto: Producto = { // Inicializar el objeto producto
    // idProducto: 0,
    nombreProducto: '',
    cantidadProducto: 0,
    precioProducto: 0,
    imgProducto: ''
  };

  selectedImage: File;

  constructor(private productoService: ProductoService){}

  formSubmit(){
    const formData: FormData = new FormData();
    formData.append('nombreProducto', this.producto.nombreProducto);
    console.log("nombreProducto: " + this.producto.nombreProducto);
    formData.append('cantidadProducto', this.producto.cantidadProducto.toString());
    console.log("cantidadProducto: " + this.producto.cantidadProducto);
    formData.append('precioProducto', this.producto.precioProducto.toString());
    
    console.log(formData);

    if(this.selectedImage){
      formData.append('imagen', this.selectedImage, this.selectedImage.name);
    }

    this.productoService.guardarProducto(formData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onFileSelected(event: any){
    this.selectedImage = event.target.files[0];
  }
}
