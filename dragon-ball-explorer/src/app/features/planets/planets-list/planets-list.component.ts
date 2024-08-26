import { Component, OnInit } from '@angular/core';
import { Planet } from '../models/planet.model';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css']
})
export class PlanetsListComponent implements OnInit {
  public planets: Planet[] = [];
  private data: any;
  public pagIndex: number = 1;
  public totalPage: number = 0;
  private totalPlanets: number = 0;
  public planetLimit: number = 0;

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.planetService.getPlanets().subscribe((planetsResponse) => {
      this.data = planetsResponse;
      if(this.data && this.data.items){
        this.planets = this.data.items;
      }
      if(this.data && this.data.meta){
        this.totalPage = this.data.meta.totalPages;
        this.totalPlanets = this.data.meta.totalItems;
        this.planetLimit = this.data.meta.itemsPerPage;
        this.getAllPlanet(this.pagIndex, this.totalPlanets, this.planets);
      }else{
        console.error('Error en los datos recibidos');
      }
    });
  }

  private getAllPlanet(pagIndex: number, totalPlanets: number, planets: Planet[]): void {
    if (this.planets.length < totalPlanets) {
      this.planetService.getNextsPlanets(pagIndex, this.planetLimit).subscribe((planetsResponse) => {
        this.data = planetsResponse;
        if (this.data && this.data.items) {
          // Filtrar planetas que ya existen en this.planets
          const newPlanets = this.data.items.filter((planet: Planet) => 
            !this.planets.some(existingPlanet => existingPlanet.id === planet.id)
          );
          this.planets = this.planets.concat(newPlanets);
        }
        if (this.data && this.data.meta) {
          this.totalPage = this.data.meta.totalPages;
          this.totalPlanets = this.data.meta.totalItems;
          this.planetLimit = this.data.meta.itemsPerPage;
          pagIndex++;
          this.getAllPlanet(pagIndex, totalPlanets, planets);
        } else {
          console.error('Error en los datos recibidos');
        }
      });
    } else {
      console.info('All planets loaded');
    }
  }
}
