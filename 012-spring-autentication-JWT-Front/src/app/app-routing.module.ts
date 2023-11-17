import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

const routes: Routes = [
  {path:'', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: DashboardComponent},
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'registrar', component: NewUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
