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
        });
        this.cdr.detectChanges();
      },
      error: (err) => {console.log(err);}
    });
  }

  public onSubmit() {
    this.formularioEnviado = true;
    console.log(this.idProducto);
    if (this.productoFormEdit && this.productoFormEdit?.valid) {
      this.porductoService.editarProducto( this.idProducto ,this.productoFormEdit.value).subscribe({
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
