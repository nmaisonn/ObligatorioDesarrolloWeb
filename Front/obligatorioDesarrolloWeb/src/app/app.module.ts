import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { CatalogComponent } from './components/catalog/catalog.component';
import { WindmillPartComponent } from './components/windmill-part/windmill-part.component';
import { ApproveComponent } from './components/approve/approve.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    CatalogComponent,
    WindmillPartComponent
    ApproveComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
