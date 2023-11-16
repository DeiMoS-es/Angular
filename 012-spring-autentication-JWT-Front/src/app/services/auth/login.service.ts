import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/interface/login-request';
import { Observable, Subject, throwError, BehaviorSubject, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null;
  private baseURLLogin = "http://localhost:8080/auth";

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>('764872647821');//recibiriá el token que es lo que me devuelve la api

  constructor(private httpClient: HttpClient) { }

  // private loginStatusSubject = new Subject<boolean>();

  public login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
    // this.loginStatusSubject.next(true);
    return this.httpClient.post(`${this.baseURLLogin}/login`, credentials).pipe(
      tap( (userData) => {
        this.currentUserLoginOn.next(true);
      })
    )
  }

  // Método para obtener el token almacenado
  public getToken(): string | null {
    return this.token;
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
