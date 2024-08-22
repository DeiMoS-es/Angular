import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharactersModule } from './features/characters/characters.module';
import { PlanetsModule } from './features/planets/planets.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    CharactersModule,
    PlanetsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
