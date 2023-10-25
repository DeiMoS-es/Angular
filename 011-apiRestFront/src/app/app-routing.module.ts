import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { CrearProductoComponent } from './pages/productos/crear-producto/crear-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './pages/usuario/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  //Rutas para productos
  { path: 'productos', component:ListarProductosComponent},
  //para ruta vacía
  // { path: '', redirectTo:'productos', pathMatch: 'full'},  
  { path: 'crear', component: CrearProductoComponent}, //Ruta para crear un producto
  { path: 'editar-producto/:id', component: EditarProductosComponent }, // Ruta para la edición de productos
  { path: 'carrito', component: CarritoComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
