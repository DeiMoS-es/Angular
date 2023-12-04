import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuardarProductoComponent } from './pages/guardar-producto/guardar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'crear', component: GuardarProductoComponent},
  {path: 'editar-producto/:idProducto', component: EditarProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
