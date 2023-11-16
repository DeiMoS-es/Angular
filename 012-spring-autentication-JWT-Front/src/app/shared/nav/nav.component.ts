import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn: boolean = false;//el usuario cuando inicia por primera vez no esta logueado
  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.isLoggedIn = userLoginOn;
        }
      }
    )
  }

  public cerrarSesion(): void {
    Swal.fire({
      text: 'Sesión cerrada',
      icon: 'error',
      timer: 1000, // Tiempo en milisegundos (en este caso, 1 segundos)
      showConfirmButton: false, // Ocultar el botón de confirmación
    });
    this.loginService.deleteToken();
  }
}
