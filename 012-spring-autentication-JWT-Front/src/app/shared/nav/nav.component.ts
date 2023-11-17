import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn: boolean = false;//el usuario cuando inicia por primera vez no esta logueado
  token: string | null = null;

  constructor(private loginService: LoginService, private UserService: UserService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.isLoggedIn = userLoginOn;
        }
      }
    );
    this.comprobarToken();
  }

  public cerrarSesion(): void {
    Swal.fire({
      text: 'Sesión cerrada',
      icon: 'error',
      timer: 1000, // Tiempo en milisegundos (en este caso, 1 segundos)
      showConfirmButton: false, // Ocultar el botón de confirmación
    });
    this.loginService.deleteToken();
    this.UserService.deleteUserData();
  }

  public comprobarToken(): void{
    this.token = this.loginService.getToken();
    if(this.token){
      this.isLoggedIn = true;
    }else
    {
      this.isLoggedIn = false;
    }
  }
}
