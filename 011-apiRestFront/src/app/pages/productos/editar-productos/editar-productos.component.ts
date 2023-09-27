import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoServiceService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent {
  editForm: FormGroup; // Formulario
  producto: any = {}; // Modelo de datos (puedes definir una interfaz más específica)
  productoEditar: any;
  idProducto: any;

  constructor(private formBuilder: FormBuilder, private productoService: ProductoServiceService, private routes: ActivatedRoute, private route : Router) { }

  ngOnInit(): void {
    // Configurar el formulario con controles y validaciones
    this.editForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required], // Campo nombre, requerido
      precioProducto: ['', Validators.required], // Campo descripción, requerido
      ivaProducto: ['', [Validators.required, Validators.min(0)]] // Campo precio, requerido y debe ser un número no negativo
    });
    // Obtiene el ID del producto de la URL usando un observable
    this.routes.paramMap.subscribe(params => {
      this.idProducto = params.get('id');
      this.idProducto = parseInt(this.idProducto, 10);
    });
    //Obtengo el producto que estoy editando
    this.productoService.buscarProductoId(this.idProducto).subscribe(
      data => {
        this.productoEditar = data;
      }
    )
  }

  onSubmit() {
    if (this.editForm.valid) {
      // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones
      // console.log(this.editForm.value); // Muestra los datos en la consola
      this.productoService.editarProducto(this.idProducto, this.editForm.value).subscribe(
        (response) =>{
          Swal.fire("Producto editado", "Click para continuar","success");          
          this.route.navigate(['/productos']);
        },
        (error) => {
          // Manejar errores si la solicitud PUT falla
          console.error('Error al editar el producto', error);
          Swal.fire("Error", error, "error");
        }
      );
    }
  }
  
  cancelar(){
    this.route.navigate(['/productos']);
  }
  // Otras funciones, como guardarCambios() y cancelarEdicion(), si es necesario
}