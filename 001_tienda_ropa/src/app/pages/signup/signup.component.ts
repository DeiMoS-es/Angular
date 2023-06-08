import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public user = {
    userName:'',
    password:'',
    nombre:'',
    primerApellido:'',
    segundoApellido:'',
    email:'',
    telefono:'',
    perfil:''
  };

  constructor(private userService: UserService, private snack:MatSnackBar){}

  ngOnInit(): void {    
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.userName == '' || this.user.userName == null){
      this.snack.open("El nombre de usuario es obligatorio", "Aceptar", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      return;
    }
    if(this.user.password == '' || this.user.password == null){
      this.snack.open("El contraseña es obligatoria", "Aceptar", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      return;
    }
    if(this.user.nombre == '' || this.user.nombre == null){
      this.snack.open("El nombre es obligatorio", "Aceptar", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      return;
    }
    if((this.user.primerApellido == '' || this.user.primerApellido == null) || (this.user.segundoApellido == '' || this.user.segundoApellido == null)){
      this.snack.open("El primer y segundo apellido son obligatorios", "Aceptar", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      return;
    }
    if(this.user.email == '' || this.user.email == null){
      this.snack.open("El correo electrónico es obligatorio", "Aceptar", {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      return;
    }

    this.userService.registrarUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire("Usuario guardado", "Usuario registrado con éxito", "success");
      }, (error) =>{
        console.log(error);
        this.snack.open("Ha ocurrido un error en el sistema", "Aceptar", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
      }
    )
  }
}
