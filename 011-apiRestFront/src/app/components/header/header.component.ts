import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/pages/productos/entity/producto';
import { ContadorCarritoService } from 'src/app/pages/productos/services/contador-carrito.service';
import { LoginService } from 'src/app/pages/productos/services/login.service';
import { ProductoServiceService } from 'src/app/pages/productos/services/producto.service';
import { UsuarioService } from 'src/app/pages/productos/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  busqueda: string = '';
  sugerencias: Producto[] = [];
  nombreProducto: string = '';
  usuarioIsLogin: boolean = false;
  token: string | null;
  constructor(private formBuilder: FormBuilder, 
              private productoService: ProductoServiceService, 
              private route: Router, 
              private contadorCarritoService: ContadorCarritoService,
              private loginService: LoginService,
              private usuarioService: UsuarioService) {};

  obtenerContador() {
    // Puedes acceder a las propiedades o métodos del servicio aquí
    const contador = this.contadorCarritoService.getContadorProductos();
    return contador;
  }
  ngOnInit(): void {
    console.log("Entro en header");
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.token = this.loginService.getToken();
    this.loginService.getLoginStatus().subscribe((status: boolean) => {
      if (status) {
        this.usuarioIsLogin = true;
      }
    });
  }
  buscarEnTiempoReal(nombreProducto: string) {
    if (nombreProducto.length >= 1) {
      // Realiza la llamada al servicio para buscar productos en tiempo real
      this.productoService.buscarTiempoReal(nombreProducto).subscribe(
        (response) => {
          this.sugerencias = response; // Actualiza la lista de sugerencias con los resultados
        },
        (error) => {
          console.error('Error al buscar productos en tiempo real', error);
          Swal.fire({
            title: "Error al buscar el producto",
            icon: "error",
            timer: 1500, // Tiempo en milisegundos (en este caso, 3 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
          })
        }
      );
    } else {
      this.sugerencias = []; // Borra la lista de sugerencias si la entrada es muy corta
    }
  }
  buscarElemento(sugerencia: any) {
    this.nombreProducto = sugerencia.nombreProducto; // Establece el nombre del producto en el input
    this.sugerencias = []; // Limpia las sugerencias
  
    // Luego, ejecuta la búsqueda en la base de datos utilizando el nombre del producto
    this.productoService.buscarPorNombre(this.nombreProducto).subscribe(
      (response) => {
        // Maneja la respuesta de la búsqueda en la base de datos
        console.log('Elemento encontrado: ', response);
        // Puedes hacer lo que desees con la respuesta, como mostrarla en otro componente o realizar alguna acción adicional.
      },
      (error) => {
        console.error('Error al buscar el elemento: ', error);
      }
    );
  }
  // Cierra la sesión (elimina el token)
  public logout(): void {
    console.log("Hago click");
    this.usuarioIsLogin = false;
    this.loginService.logout();
    this.route.navigateByUrl("/login");
  }
  onSubmit() {
    const nombreProducto = this.nombreProducto;
    if (nombreProducto.trim() !== '') {
      console.log(this.nombreProducto);
      this.productoService.buscarPorNombre(this.nombreProducto).subscribe(
        (response) => {
          
        }
      );
      // Realizar la solicitud de búsqueda utilizando this.busqueda
      // Llamar a tu servicio para buscar productos por nombre, por ejemplo
    }
    console.log("submit");
  }

}
