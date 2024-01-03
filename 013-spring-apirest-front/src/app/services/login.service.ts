import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../interface/login-request';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private token: string | null;
  private baseURLLogin = "http://localhost:8080/auth";
/**
 * Subject: es un sujeto observable que simplemente retransmite eventos a los suscriptores en el momento en que se emiten. 
 * Esto significa que si un subscriptor se suscribe a un Subject después de que el evento haya sido emitido, ese subscriptor no recibirá el evento anterior.
 * 
 * En el contexto de tu caso, si usas un Subject, los componentes que se suscriban al servicio solo recibirán actualizaciones sobre el estado de inicio de sesión si están suscritos 
 * en el momento exacto en que se llama a setUsuarioIsLogin.
 */
  //private loginStatusSubject = new Subject<boolean>();
  /**
   * BehaviorSubject: es un tipo especial de Subject que almacena el último evento emitido. Cuando un nuevo suscriptor se suscribe a un BehaviorSubject, 
     recibirá el último evento emitido (el estado actual) y luego seguirá recibiendo eventos futuros.
     Para este caso, usar un BehaviorSubject es más apropiado porque deseas que los componentes que se suscriban al servicio obtengan el estado de inicio de sesión actual tan pronto 
     como se suscriban, independientemente de cuándo se llamó a setUsuarioIsLogin. Esto garantiza que los componentes siempre reciban la información más reciente.
   */
    public usuarioIsLoginSubject = new BehaviorSubject<boolean>(false);
  constructor(private httClient: HttpClient) { }

  public login(credentials: LoginRequest):Observable<any>{
    return this.httClient.post(`${this.baseURLLogin}/login`, credentials).pipe(
      tap( (userData) => {
        this.usuarioIsLoginSubject.next(true);
      })
    );
  }

  public registrarUsuario(usuario: User):Observable<any>{
    return this.httClient.post(`${this.baseURLLogin}/register`, usuario);
  }
  
  public getLoginStatus():Observable<boolean>{
    return this.usuarioIsLoginSubject;
  }

  public getToken(): string | null{
    return localStorage.getItem('token');
  }

  public logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('userDataId');
    this.usuarioIsLoginSubject.next(false);
  }

  public deleteToken():void {
    localStorage.removeItem('token');
    this.usuarioIsLoginSubject.next(false);
  }
}
