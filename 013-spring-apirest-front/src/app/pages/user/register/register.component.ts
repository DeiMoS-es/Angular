import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  // Variables
  userForm: FormGroup
  formularioEnviado = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,
              private route: Router){}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      pais: ['', Validators.required]
    })
  }

  public onSubmit(): void{
    this.formularioEnviado = true;
    if(this.userForm.valid){      
        this.loginService.registrarUsuario(this.userForm.value).subscribe({
          next: (data) => {console.log(data);},
          error: (err) => {console.log(err);},
          complete: () => {
            Swal.fire({
              text: 'Usuario registrado con éxito.',
              icon: 'success',
              timer: 1000,
              showConfirmButton: false
            });
            this.userForm.reset();
            this.route.navigate(['/login']);
          }
        })
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public limpiarFormulario(): void {
    this.userForm.reset();
  }

}
