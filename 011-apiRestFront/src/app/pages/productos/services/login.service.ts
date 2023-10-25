import { Injectable } from '@angular/core';
import { LoginRequest } from '../entity/loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string | null;
  private baseURLLogin = "http://localhost:8080/auth";
  /**
   * Subject: Un Subject es un sujeto observable que simplemente retransmite eventos a los suscriptores en el momento en que se emiten. 
   * Esto significa que si un suscriptor se suscribe a un Subject después de que el evento haya sido emitido, ese suscriptor no recibirá el evento anterior.
     En tu caso, si usas un Subject, los componentes que se suscriban al servicio solo recibirán actualizaciones sobre el estado de inicio de sesión si están suscritos 
     en el momento exacto en que se llama a setUsuarioIsLogin.
   * BehaviorSubject: Un BehaviorSubject es un tipo especial de Subject que almacena el último evento emitido. Cuando un nuevo suscriptor se suscribe a un BehaviorSubject, 
     recibirá el último evento emitido (el estado actual) y luego seguirá recibiendo eventos futuros.
     Para este caso, usar un BehaviorSubject es más apropiado porque deseas que los componentes que se suscriban al servicio obtengan el estado de inicio de sesión actual tan pronto 
     como se suscriban, independientemente de cuándo se llamó a setUsuarioIsLogin. Esto garantiza que los componentes siempre reciban la información más reciente.
   */
  private loginStatusSubject = new Subject<boolean>();//es un objeto Subject de RxJS que actúa como un emisor de eventos. Los componentes pueden suscribirse a él para recibir notificaciones cuando ocurra un evento, en este caso, el evento es un cambio en el estado de inicio de sesión 
  // private usuarioIsLoginSubject = new BehaviorSubject<boolean>(false);

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
