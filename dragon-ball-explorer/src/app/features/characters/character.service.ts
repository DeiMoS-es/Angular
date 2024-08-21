import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from './models/character.model';

//Eliminamos la opción para que el servicio se pueda inyectar de manera global
@Injectable()
export class CharacterService {
  // https://dragonball-api.com/api/characters
  private baseUrl: string = 'https://dragonball-api.com/api/';

  constructor(private httpClient: HttpClient) { }

  public getCharacters() {
    return this.httpClient.get<Character[]>(`${this.baseUrl}characters`);
  };

  public getNextsCharacters(pagIndex: number, heroLimit: number){
    return this.httpClient.get<Character[]>(`${this.baseUrl}characters?page=${pagIndex}&limit=${heroLimit}`);
  };

  public getCharacterById(id: number) {
    return this.httpClient.get<Character>(`${this.baseUrl}characters/${id}`);
  };
}
