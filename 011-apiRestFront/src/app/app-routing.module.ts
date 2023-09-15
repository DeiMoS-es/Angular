import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';

const routes: Routes = [
  //Rutas para productos
  {path: 'productos', component:ListarProductosComponent},
  //para ruta vacía
  {path: '', redirectTo:'productos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
