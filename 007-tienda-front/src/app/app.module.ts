import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//Componentes
import { ListarProductoComponent } from './producto/pages/listar-producto/listar-producto.component';
import { GuardarProductoComponent } from './producto/pages/guardar-producto/guardar-producto.component';
import { ProductoDetalleComponent } from './producto/pages/producto-detalle/producto-detalle.component';
import { FormsModule } from '@angular/forms';
//Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
<<<<<<< HEAD
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
=======
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



>>>>>>> prueba

@NgModule({
  declarations: [
    AppComponent,
    ListarProductoComponent,
    GuardarProductoComponent,
    ProductoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
<<<<<<< HEAD
    MatIconModule,  
    MatFormFieldModule,  
    MatSnackBarModule,
    MatInputModule,
=======
    MatIconModule,
    MatFormFieldModule,   
    MatSnackBarModule, 
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
>>>>>>> prueba
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
