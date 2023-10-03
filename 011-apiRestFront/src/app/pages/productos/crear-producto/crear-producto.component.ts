import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoServiceService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  createForm: FormGroup; // Formulario
  producto: any = {}; // Modelo de datos (puedes definir una interfaz más específica)
  formularioEnviado = false;

  constructor(private formBuilder: FormBuilder, private productoService: ProductoServiceService, private route: Router) { }
  ngOnInit(): void {
    // Configurar el formulario con controles y validaciones
    this.createForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required], // Campo nombre, requerido
      precioProducto: ['', Validators.required], // Campo descripción, requerido
      ivaProducto: [''] // Campo IVA, ahora opcional
    });
  }

  onSubmit() {
    this.formularioEnviado = true;
    if (this.createForm.valid) {
      console.log(this.createForm.value); // Muestra los datos en la consola
      this.productoService.crearProducto(this.createForm.value).subscribe(
        (response) =>{
          console.log('Producto guardado exitosamente', response);
          Swal.fire({
            title: "Producto creado",
            icon: "success",
            timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
          })
          this.route.navigate(['/productos']);
      },
      (error) => {
        // Manejar errores si la solicitud PUT falla
        console.error('Error al guardar el producto', error);
        Swal.fire({
          title: "Error al crear el producto",
          icon: "error",
          timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
          showConfirmButton: false, // Ocultar el botón de confirmación
        })
        }
      );
    }
  }
}
