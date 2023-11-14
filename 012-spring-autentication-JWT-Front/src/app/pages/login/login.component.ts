import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, of, Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({//Objeto de formulario
    userName: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  formularioEnviado = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService){}

  onSubmit(){
    this.formularioEnviado = true;
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value);
      this.router.navigate(['/inicio']);
      this.loginForm.reset();//Restablecer el formulario
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}
