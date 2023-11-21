import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import Swal from 'sweetalert2';

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
      this.loginService.registerUser(this.registerForm.value).subscribe({
        //TODO mejorar el subscribe para usarlo de forma actual
        next: () => {},
        error: (e) => console.error('Ha ocurrido un error: ', e),
        complete: () => {
          Swal.fire({
            text: 'Logeado con éxito',
            icon: 'success',
            timer: 1000, // Tiempo en milisegundos (en este caso, 1 segundos)
            showConfirmButton: false, // Ocultar el botón de confirmación
          });
          this.router.navigateByUrl('/iniciar-sesion');
          this.limpiarFormulario();
        }
    });
    }
  }

 public limpiarFormulario() {
    this.registerForm.reset(); // Restablecer el formulario
  }
  
}
