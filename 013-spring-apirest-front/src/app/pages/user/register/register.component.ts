import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  // Variables
  userForm: FormGroup
  formularioEnviado = false;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    
  }

  public onSubmit(): void{

  }

  public limpiarFormulario(): void {
    
  }

}
