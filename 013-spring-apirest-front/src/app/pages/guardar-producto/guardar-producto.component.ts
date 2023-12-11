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

  public onFileSelected(event: any):void {
    const file: File | null = event.target.files?.[0] || null;
    if (file) {
      // Verificar el tamaño máximo del archivo (ejemplo: 10 MB)
      const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxSizeInBytes) {
        Swal.fire({
          title: "Error: El archivo es demasiado grande. Tamaño máximo permitido: 10 MB.",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
        console.error('Error: El archivo es demasiado grande. Tamaño máximo permitido: 10 MB.');        
        return;
      }
      // Verificar el tipo de archivo (ejemplo: solo imágenes permitidas)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: "Error: El archivo no es una imagen válido. Solo se permiten archivos JPEG, PNG o GIF.",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
        console.error('Error: El archivo no es una imagen válido. Solo se permiten archivos JPEG, PNG o GIF.');        
        return;
      }
      // Asignar el archivo seleccionado al campo imagenProducto del formulario
      this.productoForm.patchValue({
        imagenProducto: file
      });
      // Si es necesario, puedes mostrar la vista previa de la imagen aquí
      // this.mostrarVistaPrevia(file);
    } else {
      console.error('Error: No se seleccionó ningún archivo.');
      // Puedes agregar un mensaje al usuario o realizar otras acciones según tus necesidades
    }
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
        Swal.fire({
            title: "Error al crear el producto",
            icon: "error",
            timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
        })
      },
      complete: () => {
        Swal.fire({
            title: "Producto creado",
            icon: "success",
            timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
        });
          this.route.navigate(['dashboard']);
      }
    });
  } else{
        this.productoForm.markAllAsTouched();
      }
  }

  public limpiarFormulario() {
    this.productoForm.reset(); // Restablecer el formulario
  }
}
