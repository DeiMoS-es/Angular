<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../model';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
=======
import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import {Producto} from '../../../model';
>>>>>>> prueba

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css']
})
export class GuardarProductoComponent implements OnInit {
  
producto : Producto= new Producto();
selectedFile: File | null = null;

<<<<<<< HEAD
 constructor(private productoService: ProductoService, private snack: MatSnackBar){}

 ngOnInit(): void {
   
 }

 formSubmit(){
  console.log(this.producto);
  const formData: FormData = new FormData();
        formData.append('nombreProducto', this.producto.nombreProducto);
        formData.append('precioProducto', this.producto.precioProducto.toString());
        formData.append('stock', this.producto.stock.toString());

  if (this.selectedFile) {
    formData.append('imagen', this.selectedFile, this.selectedFile.name);
  }
  if(this.producto.nombreProducto == '' || this.producto.nombreProducto == null){
    this.snack.open("El nombre del producto es obligatorio", "Aceptar",{
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    return;
  }
  if( isNaN(this.producto.precioProducto) || this.producto.precioProducto == null){
    this.snack.open("El precio del producto es obligatorio", "Aceptar",{
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    return;
  }
  if( isNaN(this.producto.stock) || this.producto.stock == null){
    this.snack.open("El stock del producto es obligatorio", "Aceptar",{
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "right"
    });
    return;
  }
  
  this.productoService.guardarProducto(formData).subscribe(
    (data) => {
      console.log(data);
      Swal.fire("Producto guardado", "Producto registrado con éxito", "success");
    }, (error) =>{
      console.log(error);
      this.snack.open("Ha ocurrido un error en el sistema", "Aceptar", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }
  )
 }

 onFileSelected(event: any) {
  console.log("hola");
  this.selectedFile = event.target.files[0];
}
=======
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
>>>>>>> prueba
}
