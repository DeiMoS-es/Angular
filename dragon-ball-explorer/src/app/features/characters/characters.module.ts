import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterService } from './character.service';
import { HttpClientModule } from '@angular/common/http';
import { CharacterCardComponent } from './character-card/character-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CharacterViewComponent } from './character-view/character-view.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterCardComponent,
    CharacterViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule
  ],
  exports: [
    CharacterListComponent,
    CharacterCardComponent,
    CharacterViewComponent
  ],
  providers: [
    CharacterService
  ]
})
export class CharactersModule { }
