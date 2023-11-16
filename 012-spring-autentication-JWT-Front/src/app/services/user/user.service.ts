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
    return this.httpClient.get(`${this.baseURLUser}/buscarUsuarioNombre/${username}`);     
  }

}
