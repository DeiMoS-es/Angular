import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css', '../login/login.component.css']
})
export class NewUserComponent implements OnInit {
  registerForm: FormGroup;
  formularioEnviado = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: [''], // Haciendo 'apellido' opcional
        country: ['']   // Haciendo 'país' opcional
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formularioEnviado = true;
    if (this.registerForm.valid) {
      // Aquí puedes hacer algo con los datos, como enviarlos al backend
      console.log('Datos del nuevo usuario:', this.registerForm.value);
      this.loginService.registerUser(this.registerForm.value).subscribe(
        //TODO mejorar el subscribe para usarlo de forma actual
        (Response) => {
          console.log("Exito");
        },
        (error)=>{
          console.log("Error");
        }
      );
      // Redirigir a la página de inicio después de registrar el usuario
      this.router.navigateByUrl('/inicio');
    }
  }

 public limpiarFormulario() {
    this.registerForm.reset(); // Restablecer el formulario
  }
  
}
