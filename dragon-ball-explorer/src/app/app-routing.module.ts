import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './features/characters/character-list/character-list.component';
import { CharacterViewComponent } from './features/characters/character-view/character-view.component';

const routes: Routes = [
  {path: '', component: CharacterListComponent},
  {path: 'characters', component: CharacterListComponent},
  {path: 'characters/:id', component: CharacterViewComponent}
];
// const routes: Routes = [
//   { path: '', component: CharacterListComponent, 
//     children: [
//       {path: 'characters/:id', component: CharacterViewComponent}
//     ]
//   }
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
