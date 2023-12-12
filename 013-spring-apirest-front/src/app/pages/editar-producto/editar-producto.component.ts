import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/interface/producto';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  //Variables
  productoFormEdit: FormGroup;
  formularioEnviado = false;
  idProducto: any;
  productoEditado: Producto;
  // imagenValida = true;

  constructor(
    private porductoService: ProductoService,
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoFormEdit = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.maxLength(100)],
      precioProducto: ['', Validators.pattern(/^\d+(\.\d+)?$/)],
      stockProducto: ['', Validators.pattern(/^\d+$/)],
      tipoProducto: ['', Validators.required],
      imagenProducto: ['' || null]
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.idProducto = params.get('idProducto');
      this.idProducto = parseInt(this.idProducto, 10);
    });
    // Obtén el producto a editar del servicio (asumiendo que obtenerProductoId devuelve una promesa)
    this.porductoService.obternerProductoId(this.idProducto).subscribe({
      next:(data: Producto) =>{
        this.productoEditado = data;
        // Asigna valores al formulario después de crearlo
        this.productoFormEdit.patchValue({
          nombreProducto: this.productoEditado.nombreProducto || '',
          descripcionProducto: this.productoEditado.descripcionProducto || '',
          precioProducto: this.productoEditado.precioProducto || '',
          stockProducto: this.productoEditado.stockProducto || '',
          tipoProducto: this.productoEditado.tipoProducto || '',
          imagenProducto: this.productoEditado.imagen // Inicializado con null ya que no es requerido inicialmente
        });
        this.cdr.detectChanges();
      },
      error: (err) => {console.log(err);}
    });
  }

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
      this.productoFormEdit.patchValue({
        imagenProducto: file
      });
      // Si es necesario, puedes mostrar la vista previa de la imagen aquí
      // this.mostrarVistaPrevia(file);
    } else {
      console.error('Error: No se seleccionó ningún archivo.');
      // Puedes agregar un mensaje al usuario o realizar otras acciones según tus necesidades
    }
  }

  public onSubmit() {
    this.formularioEnviado = true;
    if (this.productoFormEdit && this.productoFormEdit?.valid) {
      const formData = new FormData();
      formData.append("nombreProducto", this.productoFormEdit.get("nombreProducto")!.value);
      formData.append("descripcionProducto", this.productoFormEdit.get("descripcionProducto")!.value);
      formData.append("precioProducto", this.productoFormEdit.get("precioProducto")!.value);
      formData.append("stockProducto", this.productoFormEdit.get("stockProducto")!.value);
      formData.append("tipoProducto", this.productoFormEdit.get("tipoProducto")!.value);
      // Verificar si se proporciona una nueva imagen
      const nuevaImagenSeleccionada = this.productoFormEdit.get('imagenProducto')!.value !== this.productoEditado.imagen.imagenUrl;
      // Agregar la imagen al FormData solo si se selecciona una nueva
      if (nuevaImagenSeleccionada) {
        formData.append('multipartFile', this.productoFormEdit.get("imagenProducto")!.value);
      }
      this.porductoService.editarProducto( this.idProducto ,formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log('Error: ', err);
          Swal.fire({
            title: 'Error al editar el producto',
            icon: 'error',
            timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
          });
        },
        complete: () => {
          console.log('Complete');
          Swal.fire({
            title: 'Producto Editado',
            icon: 'success',
            timer: 2000, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
          });
          this.route.navigate(['dashboard']);
        },
      });
    } else {
      this.productoFormEdit.markAllAsTouched();
    }
  }

  public limpiarFormulario() {
    this.productoFormEdit.reset(); // Restablecer el formulario
  }
}
