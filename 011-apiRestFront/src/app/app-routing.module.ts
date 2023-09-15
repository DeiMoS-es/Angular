import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';

const routes: Routes = [
  //Rutas para productos
  {path: 'productos', component:ListarProductosComponent},
  //para ruta vacía
  {path: '', redirectTo:'productos', pathMatch: 'full'},
  { path: 'editar-producto/:id', component: EditarProductosComponent } // Ruta para la edición de productos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
