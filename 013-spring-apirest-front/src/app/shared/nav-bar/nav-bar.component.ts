import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interface/producto';
import { ContadorCarritoService } from 'src/app/services/contador-carrito.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  //Variables
  nombreProducto: string = '';
  sugerencias: Producto[] = [];
  isLoggedIn: boolean = false;//el usuario cuando inicia por primera vez no esta logueado
  token: string | null = null;

  constructor(private productoService: ProductoService, private contadorCarrito: ContadorCarritoService,
              private userService: UsuarioService, private loginService: LoginService,
              private route: Router){}

  ngOnInit(): void {
    this.loginService.usuarioIsLoginSubject.subscribe({
      next: (userLoginOn) => {
        this.isLoggedIn = userLoginOn;
      }
    });
    this.comprobarToken();
  }

  public busquedaEnTiempoReal(nombreProducto: string){
    if(nombreProducto.length > 1){
      this.productoService.busquedaEnTiempoReal(nombreProducto).subscribe({
        next: (data) => {this.sugerencias = data;},
        error:(err) =>{console.log(err);},   
      });
    }else{
      this.sugerencias = [];
    }
  }

  public buscarElemento(sugerencia: any){
    this.productoService.actualizarProductoSeleccionado(sugerencia);
  }

  public onSubmit(){
    console.log(this.nombreProducto);
  }

  public obtenerContadorProductos(){
    const contador = this.contadorCarrito.getContadorProductos();
    return contador;
  }

  /**
   * decorador @HostListener para escuchar el evento click en todo el documento (document)
   * @param event 
   */
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    // Verificar si el clic fue dentro o fuera de la lista
    if (!targetElement.closest('.mr-100')) {
      // Cerrar la lista
      this.sugerencias = [];
    }
  };

  private comprobarToken():void{
    this.token = this.loginService.getToken();
    if(this.token){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  public cerrarSesion():void{
    Swal.fire({
      text: 'Sesión cerrada.',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false
    });
    this.loginService.deleteToken();
    this.route.navigate(['dashboard']);
    // this.userService.deleteUserData();
  }
}
