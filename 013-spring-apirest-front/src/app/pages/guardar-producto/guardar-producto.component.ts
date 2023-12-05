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

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder, private route: Router){}

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      descripcionProducto: ['', [Validators.required, Validators.maxLength(100)]],
      precioProducto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      stockProducto: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      tipoProducto: ['', [Validators.required]],
      imagenProducto: [null] // Inicializado con null ya que no es requerido inicialmente
    })
  };
  public onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file);
    // Puedes realizar validaciones adicionales aquí si es necesario
    // Asigna el archivo seleccionado al campo imagenProducto del formulario
    this.productoForm.patchValue({
        imagenProducto: file
    });
  }

  public onSubmit(){
    this.formularioEnviado = true;
    if(this.productoForm.valid){
    const formData = new FormData();
    formData.append("nombreProducto", this.productoForm.get("nombreProducto")!.value);
    formData.append("descripcionProducto", this.productoForm.get("descripcionProducto")!.value);
    formData.append("precioProducto", this.productoForm.get("precioProducto")!.value);
    formData.append("stockProducto", this.productoForm.get("stockProducto")!.value);
    formData.append("tipoProducto", this.productoForm.get("tipoProducto")!.value);

    //Agregar la imagen
    formData.append('multipartFile', this.productoForm.get("imagenProducto")!.value);
    console.log(formData);
    // Llamar al servicio con el objeto FormData
    this.productoService.guardarProducto(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log("Error: ", err);
      },
      complete: () => {
        console.log("Complete");
      }
    });
  } else{
        this.productoForm.markAllAsTouched();
      }
  }
  // public onSubmit(){
  //   this.formularioEnviado = true;
  //   if(this.productoForm.valid){
  //     console.log(this.productoForm.value);
  //     this.productoService.guardarProducto(this.productoForm.value).subscribe({
  //       next:(data) =>{console.log(data);},
  //       error:(err) =>{
  //         console.log("Error: ", err);
  //         Swal.fire({
  //           title: "Error al crear el producto",
  //           icon: "error",
  //           timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
  //           showConfirmButton: false, // Ocultar el botón de confirmación
  //         })
  //       },
  //       complete:() =>{
  //         console.log("Complete");
  //         Swal.fire({
  //           title: "Producto creado",
  //           icon: "success",
  //           timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
  //           showConfirmButton: false, // Ocultar el botón de confirmación
  //         });
  //         this.route.navigate(['dashboard']);
  //       }
  //     })
  //   } else{
  //     this.productoForm.markAllAsTouched();
  //   }
  // };

  public limpiarFormulario() {
    this.productoForm.reset(); // Restablecer el formulario
  }
}
