import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
   imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  // Creamos un evento llamado loginSubmit que emitirá un objeto con email y password.
  @Output() loginSubmit = new EventEmitter<{
    email: string;
    password: string;
  }>();

  //Creamos el formulario con dos campos: email y password.
  formLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.formLogin.valid) {
      this.loginSubmit.emit(this.formLogin.value);
    }
  }
}
