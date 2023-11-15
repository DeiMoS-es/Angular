import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/interface/login-request';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null;
  private baseURLLogin = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  private loginStatusSubject = new Subject<boolean>();

  public login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
    this.loginStatusSubject.next(true);
    return this.httpClient.post(`${this.baseURLLogin}/login`, credentials);
  }

  // Método para obtener el token almacenado
  public getToken(): string | null {
    return this.token;
  }
}
