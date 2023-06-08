import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit{
  dataSource?: any;
  displayedColumns: string[] = ['id', 'usuario', 'nombre', 'apellido1', 'apellido2', 'fechaAlta', 'telefono', 'email', 'perfil', 'acciones'];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.listarUsuarios().subscribe(
      usuarios => {    
        this.dataSource = usuarios;
      }
    )
  }

  
}
