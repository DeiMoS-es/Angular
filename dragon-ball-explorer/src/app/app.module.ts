import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonajeComponent } from './features/personaje/personaje.component';
import { CharactersModule } from './features/characters/characters.module';

@NgModule({
  declarations: [
    AppComponent,
    PersonajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    CharactersModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
