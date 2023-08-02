import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponentComponent } from './component/nav-bar-component/nav-bar-component.component';
import { PrincipalComponentComponent } from './component/principal-component/principal-component.component';
import { CvComponentComponent } from './component/cv-component/cv-component.component';
import { BlogComponentComponent } from './component/blog-component/blog-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Externos
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponentComponent,
    PrincipalComponentComponent,
    CvComponentComponent,
    BlogComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
