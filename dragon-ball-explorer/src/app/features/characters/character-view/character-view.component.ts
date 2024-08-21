import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../models/character.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit{
  public character!: Character;
  constructor(private characterServices: CharacterService, private route: ActivatedRoute) { };

  ngOnInit(): void {
    const characterId = Number(this.route.snapshot.paramMap.get('id'));
    this.characterServices.getCharacterById(characterId).subscribe((character) => {
      this.character = character;
    });
  };
}
