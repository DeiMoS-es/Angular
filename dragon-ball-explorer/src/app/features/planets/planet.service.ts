import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planet } from './models/planet.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private urlPlanets: string = 'https://dragonball-api.com/api/planets';

  constructor(private httpClient: HttpClient) { }

  public getPlanets() {
    return this.httpClient.get<Planet[]>(`${this.urlPlanets}`);
  };

  public getNextsPlanets(pagIndex: number, planetLimit: number){
    return this.httpClient.get<Planet[]>(`${this.urlPlanets}?page=${pagIndex}&limit=${planetLimit}`);
  };
}
