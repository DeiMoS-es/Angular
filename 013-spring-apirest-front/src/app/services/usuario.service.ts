import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private baseUserURL = "http://localhost:8080/users";
  private userData: User;
  private userDataSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) { }

  public buscarUsuarioPorNombre(userName: string): Observable<any>{  
    return this.httpClient.get(`${this.baseUserURL}/buscarPorNombre/${userName}`);
  }

  public buscarUsuarioById(idUsuario: number): Observable<any>{
    return this.httpClient.get(`${this.baseUserURL}/buscarById/${idUsuario}`);
  }

  public recuperarIdUsuario(){
    return localStorage.getItem('userDataId');
  }
}
