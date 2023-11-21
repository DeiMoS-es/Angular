import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/interface/login-request';
import { Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null;
  private baseURLLogin = "http://localhost:8080/auth";

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  public login(credentials: LoginRequest): Observable<any> {
    return this.httpClient.post(`${this.baseURLLogin}/login`, credentials).pipe(
      tap( (userData) => {
        this.currentUserLoginOn.next(true);
      })
    )
  }

  public registerUser(userData: User){
    return this.httpClient.post(`${this.baseURLLogin}/register`, userData)
  }

  // Método para obtener el token almacenado
  public getToken(): string | null {
    this.token = localStorage.getItem('token');
    return this.token;
  }
  
  //Método para eliminar el token y cerrar la sesión
  public deleteToken():void{
    //obtener el token del localstorage
    this.token = localStorage.getItem('token');
    //eliminar el token del localstorage
    localStorage.removeItem('token');
    //this.loginStatusSubject.next(false);
    this.currentUserLoginOn.next(false);
  }

 //Si quisiera maneja los posibles errores, pero como ya lo manejo en el componente no sería necesario
  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log("Se ha producido un error: " + error.error);
    }else{
      console.log("Backend retornó el código de estado " + error.status, error.error);
    }
    return throwError(()=>{"Algo falló. Intente nuevamente más tarde."})
  }

  get userUserLoginOn():Observable<any>{
    return this.currentUserLoginOn.asObservable();
  }
}
