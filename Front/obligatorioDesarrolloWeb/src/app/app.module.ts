import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CreationComponent } from './components/creation/creation.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { WindmillPartComponent } from './components/windmill-part/windmill-part.component';
import { ApproveComponent } from './components/approve/approve.component';
import { ModalComponent } from './components/modal/modal.component';
import { ListComponent } from './components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardButtonsComponent } from './components/card-buttons/card-buttons.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreationComponent,
    CatalogComponent,
    WindmillPartComponent,
    ApproveComponent,
    ModalComponent,
    ListComponent,
    CardButtonsComponent


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
