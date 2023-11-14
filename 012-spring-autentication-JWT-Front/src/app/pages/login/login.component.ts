import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, of, Observable } from 'rxjs';

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
  constructor(private formBuilder: FormBuilder, private router: Router){}

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      console.log("Llamar al servicio de login");
      this.router.navigate(['/inicio']);
      this.loginForm.reset();//Restablecer el formulario
    }else{
      alert("ERROR El formulario no es válido");
    }
  }

}
