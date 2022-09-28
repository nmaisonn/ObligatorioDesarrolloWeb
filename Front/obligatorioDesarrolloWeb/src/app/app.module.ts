import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CreationComponent } from './components/creation/creation.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { WindmillPartComponent } from './components/windmill-part/windmill-part.component';
import { ApproveComponent } from './components/approve/approve.component';
<<<<<<< HEAD
import { WindmillComponent } from './components/windmill/windmill.component';
import { DetailWindmillModalComponent } from './components/detail-windmill-modal/detail-windmill-modal.component';
=======
import { ModalComponent } from './components/modal/modal.component';
import { ListComponent } from './components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardButtonsComponent } from './components/card-buttons/card-buttons.component';
import { CreationViewComponent } from './components/creation-view/creation-view.component';
import { FooterComponent } from './components/footer/footer.component';

>>>>>>> 04054f17483d1b0e0922ca371b21d54b12f006a9


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CatalogComponent,
    WindmillPartComponent,
    ApproveComponent,
    WindmillComponent,
    DetailWindmillModalComponent,
    CreationComponent,
    CatalogComponent,
    WindmillPartComponent,
    ApproveComponent,
    ModalComponent,
    ListComponent,
    CardButtonsComponent,
    CreationViewComponent,
    FooterComponent
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
