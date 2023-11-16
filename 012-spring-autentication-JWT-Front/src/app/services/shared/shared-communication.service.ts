import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Servicio compartido para la comunicación entre componentes relacionados con el estado de inicio de sesión.
 */
@Injectable({
  providedIn: 'root'
})
export class SharedCommunicationService {

  private loginStatusSubject = new Subject<boolean>();
/**
   * Observable que emite el estado de inicio de sesión.
   * // Suscripción para escuchar cambios en el estado de inicio de sesión
   */
  //La convención de agregar el símbolo del dólar ($) al final del nombre de una variable en TypeScript indica que esa variable es un observable.
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor() { }
  /**
   * Actualiza el estado de inicio de sesión.
   * @param status - Nuevo estado de inicio de sesión.
   * @example
   * // Actualizar el estado de inicio de sesión
   * this.sharedCommunicationService.updateLoginStatus(true);
   */
  public updateLoginStatus(status: boolean) {
    this.loginStatusSubject.next(status);
  }
  
  // Método necesario para manejar la desvinculación del Subject
  private destroy$ = new Subject<void>();
  /**
   * Método destrucción del servicio. Limpia los recursos y desvincula los observadores.
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
