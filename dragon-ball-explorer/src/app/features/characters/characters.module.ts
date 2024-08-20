import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterService } from './character.service';
import { HttpClientModule } from '@angular/common/http';
import { CharacterCardComponent } from './character-card/character-card.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule
  ],
  exports: [
    CharacterListComponent,
    CharacterCardComponent
  ],
  providers: [
    CharacterService
  ]
})
export class CharactersModule { }
