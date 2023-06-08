import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Usuario } from '../model';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public registrarUsuario(user: any){
    return this.httpClient.post(`${baseUrl}/usuarios/guardar`, user);
  }

  public listarUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${baseUrl}/usuarios/listar`)
  }
}
