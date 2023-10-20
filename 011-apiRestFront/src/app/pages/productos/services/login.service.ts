import { Injectable } from '@angular/core';
import { LoginRequest } from '../entity/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURLLogin = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  public login(credentials:LoginRequest):Observable<any>{
    // console.log(credentials);
    return this.httpClient.post(`${this.baseURLLogin}/login`, credentials);
  }

  // Verifica si el usuario está autenticado
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obtiene el token de autenticación
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Cierra la sesión (elimina el token)
  public logout(): void {
    localStorage.removeItem('token');
  }
}
