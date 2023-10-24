import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUserURL = "http://localhost:8080/usuario";

  constructor(private httpClient: HttpClient) { }
  
  public buscarUsuarioPorNombre(userName: string){
    const token = localStorage.getItem('token');
    if(token){
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });    
    return this.httpClient.get(`${this.baseUserURL}/buscarUsuarioNombre/${userName}`, {headers});
    }else {
      // En el caso en que no haya un token válido, puedes manejarlo según tus necesidades.
      return console.error("Error");      
    }
  }
}
