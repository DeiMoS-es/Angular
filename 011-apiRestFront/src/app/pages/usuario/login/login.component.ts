import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../productos/services/login.service';
import { UsuarioService } from '../../productos/services/usuario.service';
import { switchMap, of, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  fieldTouched = false;
  isUserNameEmpty: boolean = false;
  formularioEnviado = false;
  userName: string;
  user:any;
  constructor(private formBuilder: FormBuilder, private route: Router, private loginService: LoginService, private userService: UsuarioService) {
    this.loginForm = this.formBuilder.group({
      userName: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  

  onSubmit() {
    this.formularioEnviado = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).pipe(
        switchMap((tokenData) => {
          const tokenObject = JSON.parse(JSON.stringify(tokenData));
          const tokenString = tokenObject.token;
          console.log(tokenString);
          localStorage.setItem('token', tokenString);
  
          const userName = this.loginForm.get('userName')?.value;
          
          // Comprobamos si userName es una cadena no vacía
          if (typeof userName === 'string' && userName.trim() !== '') {
            return this.userService.buscarUsuarioPorNombre(userName) as Observable<Object>;
          } else {
            // En lugar de of(null), retornamos un observable vacío
            return new Observable();
          }
        })
      ).subscribe(
        (response) => {
          if (response) {
            this.user = response;
            console.log("Usuario:", this.user);
          } else {
            console.error("No se encontró un usuario válido.");
          }
          this.route.navigateByUrl("/productos");
          this.loginForm.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
  // onSubmit(){
  //   this.formularioEnviado = true;
  //   if (this.loginForm.valid) {
  //     this.loginService.login(this.loginForm.value).subscribe({
  //       next: (tokenData) => {
  //         //Almaceno el token que me devuelve mi backend
  //         const tokenObject = JSON.parse(JSON.stringify(tokenData));
  //         const tokenString = tokenObject.token;
  //         console.log(tokenString);//Compruebo que recibo el token
  //         localStorage.setItem('token', tokenString);
  //       },
  //       error: (errorData) => {
  //         console.log(errorData);
  //       },
  //       complete: () => {
  //         console.info("Login Completo");
  //         this.userName = this.loginForm.get('userName')?.value;
  //         console.log(this.loginForm.get('userName')?.value);
  //         this.userService.buscarUsuarioPorNombre(this.userName)?.subscribe(
  //           (response) => {
  //             this.user = response;
  //           },
  //           (error)=>{
  //             console.error(error);
  //           }
  //         );
  //         console.log("Usuario: ", this.user);
  //         // Redirige al usuario a la página protegida
  //         this.route.navigateByUrl("/productos");
  //         this.loginForm.reset();
  //       }
  //     });
  //   }
  // }
}
