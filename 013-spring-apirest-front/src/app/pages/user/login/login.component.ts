import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, switchMap, EMPTY, catchError } from 'rxjs';
import { LoginRequest } from 'src/app/interface/login-request';
import { User } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
//Variables
  // loginForm: FormGroup;
  // fieldTouched = false;
  // isUserNameEmpty: boolean = false;
  formularioEnviado = false;
  userData: User;
  loginForm = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  })
  constructor(private formBuilder: FormBuilder, private route: Router,
              private loginService: LoginService, private userService: UsuarioService){}


/**
 * El método .pipe() en RxJS se utiliza para encadenar operadores que transforman o manipulan observables.
 * En este caso, se utiliza .pipe() para encadenar el operador switchMap. Después de realizar la llamada al servicio de inicio de sesión.
 * El operador switchMap se utiliza para cambiar a otro observable. En este caso, se utiliza para manejar el token de autenticación y realizar operaciones adicionales, como el almacenamiento del token y la búsqueda de información del usuario.
 */
// TODO redireccionar en caso de login exitoso
// TODO implementar interceptor para las peticiones
// TODO en bck corregir rutas (las pñublicas y privadas)
  public onSubmit(){
    this.formularioEnviado = true;
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).pipe(
        switchMap((tokenData) => {
          // const tokenObject = JSON.parse(JSON.stringify(tokenData));
          const tokenString = tokenData.token;
          localStorage.setItem('token', tokenString);
          // Comprobamos si userName es una cadena no vacía
          const username = this.loginForm.get("username")?.value;
          if(typeof username === 'string' && username.trim() !== '' && username.length > 0){
            return this.userService.buscarUsuarioPorNombre(username) as Observable<Object>;
          } else {
            return EMPTY;
          }
        }),
        catchError((error) => {
          let errorMessage = 'Ocurrió un error durante el inicio de sesión.';
          if(error.status === 401){
            errorMessage = 'Usuario o contraseña incorrectos.';
          } else if(error.status === 403){
            errorMessage = 'Acceso no autorizado.';
          }
          Swal.fire({
            title: errorMessage,
            icon: 'warning',
            timer: 1000,
            showConfirmButton: false,
          });
          throw error; // Propagar el error después de manejarlo
        })
      ).subscribe({
        next: (response) => {
          this.userData = response as User;
          this.userData.token = this.loginService.getToken() || '';
          console.log(this.userData);
        },
        error: (err) => {console.log(err);},
        complete: () => {
          Swal.fire({
            text: 'Logeado con éxito.',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
          });
          this.route.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
