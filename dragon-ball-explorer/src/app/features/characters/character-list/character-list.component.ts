import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  data: any;

  constructor(private characterService: CharacterService) { };
  
  ngOnInit(): void {
    this.characterService.getAllCharacters().subscribe((character) => {
      this.data = character;
      if (this.data && this.data.items) {
        this.characters = this.data.items;
      } else {
        console.error('La propiedad items no existe en los datos recibidos');
      }
    });
  };

}
