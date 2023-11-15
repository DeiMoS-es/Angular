import { Component } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginRequest } from 'src/app/interface/login-request';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    //Objeto de formulario
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  formularioEnviado = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  onSubmit() {
    this.formularioEnviado = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).pipe(
          switchMap((tokenData) => {
            const tokenObject = JSON.parse(JSON.stringify(tokenData));
            const tokenString = tokenObject.token;
            localStorage.setItem('token', tokenString);
            const userName = this.loginForm.get('username')?.value;
            if(typeof userName ==='string' && userName.length > 0) {
              return this.userService.buscarUsuarioNombre(userName);
            }else{
              return new Observable();
            }
            // return of(tokenString); // Devuelve solo el token como un observable
          }),
          catchError(error => {
            console.error('Error durante la solicitud:', error);
            throw error; // Propagar el error después de manejarlo
          })
        )
        .subscribe(
          {
            next: (response) => console.log(response),
            error: (e) => console.error("No se encontró un usuario válido.", e),
            complete: () =>{
              Swal.fire({
                // title: "Good job!",
                text: "Logeado con éxito",
                icon: "success",
                timer: 1000, // Tiempo en milisegundos (en este caso, 3 segundos)
                showConfirmButton: false, // Ocultar el botón de confirmación
              });
              this.router.navigateByUrl("/inicio");
            } 
          }
        );
    }
  }
}
