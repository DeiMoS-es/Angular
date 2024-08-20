import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponentComponent } from './component/principal-component/principal-component.component';
import { CvComponentComponent } from './component/cv-component/cv-component.component';

const routes: Routes = [  
  { path: '', component: PrincipalComponentComponent},
  { path: 'conoceme', component: CvComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
