import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  links: { [key: string]: string } = {};
  data: any;
  pagIndex: number = 1;
  totalPage: number = 0;
  totalHeroes: number = 0;
  heroLimit: number = 0;

  constructor(private characterService: CharacterService, private router: Router) { };
  
  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((characterResponse) => {
      this.data = characterResponse;
      // console.log(characterResponse);
      if (this.data && this.data.items) {
        this.characters = this.data.items;
      }
      if(this.data && this.data.links){
        // console.log(this.data.links);
        this.links = this.data.links;
      }
      if(this.data && this.data.meta){
        this.totalPage = this.data.meta.totalPages;
        this.totalHeroes = this.data.meta.totalItems;
        this.heroLimit = this.data.meta.itemsPerPage;
      }
      else{
        console.error('Error en los datos recibidos');
      }
    });
  };

  public onPageChange(event: any): void {
    this.pagIndex = this.estadoPageIndex(event, this.pagIndex);
    this.obtenerHeroes(this.pagIndex, this.heroLimit);
  };
  // Función para devolver el índice de la página
  private estadoPageIndex(event: any, pageIndex: number){
    if(pageIndex <= event.pageIndex){
      pageIndex++;
    }
    else if(pageIndex > event.pageIndex){
      pageIndex--;
    }
    return pageIndex;
  };
  
  private obtenerHeroes(pagIndex: number, heroLimit: number) {
    this.characterService.getNextsCharacters(pagIndex, heroLimit).subscribe((characterResponse) => {
      this.data = characterResponse;
      if (this.data && this.data.items) {
        this.characters = this.data.items;
      }
      if(this.data && this.data.links){
        this.links = this.data.links;
      }
      if(this.data && this.data.meta){
        this.totalPage = this.data.meta.totalPages;
        this.totalHeroes = this.data.meta.totalItems;
        this.heroLimit = this.data.meta.itemsPerPage;
      }
      else{
        console.error('Error en los datos recibidos');
      }
    });
  };

  public viewHeroDetail(heroId: number): void {
    this.router.navigate(['/characters', heroId]);
  }
}
