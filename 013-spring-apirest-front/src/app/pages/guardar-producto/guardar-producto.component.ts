import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css']
})
export class GuardarProductoComponent implements OnInit{
  //Variables
  productoForm: FormGroup;
  formularioEnviado = false;

  constructor(private porductoService: ProductoService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      descripcionProducto: ['', [Validators.required, Validators.maxLength(100)]],
      precioProducto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      stockProducto: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      tipoProducto: ['', [Validators.required]]
    })
  };

  public onSubmit(){
    this.formularioEnviado = true;
    if(this.productoForm.valid){
      console.log(this.productoForm.value);
      this.porductoService.guardarProducto(this.productoForm.value).subscribe({
        next:(data) =>{console.log(data);},
        error:(err) =>{console.log("Error: ", err);},
        complete:() =>{
          console.log("Complete");
          Swal.fire({
            title: "Producto creado",
            icon: "success",
            timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
          })
        }
      })
    }
  };

  public limpiarFormulario() {
    this.productoForm.reset(); // Restablecer el formulario
  }
}
