import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURLUser = "http://localhost:8080/usuario";

  constructor(private httpClient: HttpClient) { }

  public buscarUsuarioNombre(username: string): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      //Encabezado para mandar token en la solicitud
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });  
      return this.httpClient.get(`${this.baseURLUser}/buscarUsuarioNombre/${username}`, {headers}); 
    }else{
      // En el caso en que no haya un token válido, puedes manejarlo según tus necesidades.
      return throwError("Token no válido");  
    }
    
  }

}
