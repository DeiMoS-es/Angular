import { Injectable } from '@angular/core';
import { LoginRequest } from '../entity/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string | null;
  private baseURLLogin = "http://localhost:8080/auth";
  private loginStatusSubject = new Subject<boolean>();//es un objeto Subject de RxJS que actúa como un emisor de eventos. Los componentes pueden suscribirse a él para recibir notificaciones cuando ocurra un evento, en este caso, el evento es un cambio en el estado de inicio de sesión 

  constructor(private httpClient: HttpClient) { }

  public login(credentials:LoginRequest):Observable<any>{
    // console.log(credentials);
    this.loginStatusSubject.next(true); // Emite un evento cuando se inicia sesión, Subject de RxJS notifica al componente HeaderComponent (componente donde se llama al método siguiente(getLoginStatus))) que el usuario ha iniciado sesión.
    return this.httpClient.post(`${this.baseURLLogin}/login`, credentials);
  }

  //Método para saber si un usuario ha iniciado sesión
  /**
   * Proporciona una forma de observar el estado del inicio de sesión. 
   * asObservable() convierte este Subject en un Observable. Esto es útil para garantizar que los componentes que se suscriben solo puedan observar el estado de inicio de sesión, pero no puedan emitir nuevos valores.
   * @returns devuelve un observable que se utiliza para manejar flujos de datos asíncronos
   */
  public getLoginStatus(): Observable<boolean> {
    return this.loginStatusSubject.asObservable();
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
