import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { CatalogComponent } from './components/catalog/catalog.component';
import { WindmillPartComponent } from './components/windmill-part/windmill-part.component';
import { ApproveComponent } from './components/approve/approve.component';
import { ModalComponent } from './components/modal/modal.component';
import { ListComponent } from './components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    CatalogComponent,
    WindmillPartComponent,
    ApproveComponent,
    ModalComponent,
    ListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
