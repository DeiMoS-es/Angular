import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from './models/character.model';

//Eliminamos la opción para que el servicio se pueda inyectar de manera global
@Injectable()
export class CharacterService {
  // https://dragonball-api.com/api/characters
  private baseUrl: string = 'https://dragonball-api.com/api/';

  constructor(private httpClient: HttpClient) { }

  public getAllCharacters() {
    return this.httpClient.get<Character[]>(`${this.baseUrl}characters`);
  };
}
