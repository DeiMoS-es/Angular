import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Agrega el encabezado de autorización con tu lógica de token
    const token = this.loginService.getToken();
    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authRequest);
    } else {
      console.log('No hay token disponible');
      return next.handle(request); // No agrega encabezado de autorización
    }
  }
}
