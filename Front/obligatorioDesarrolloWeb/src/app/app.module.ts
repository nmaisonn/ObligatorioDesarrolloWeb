import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CreationComponent } from './components/creation/creation.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { WindmillPartComponent } from './components/windmill-part/windmill-part.component';
import { ApproveComponent } from './components/approve/approve.component';
import { ListComponent } from './components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { WindmillComponent } from './components/windmill/windmill.component';
import { DetailWindmillModalComponent } from './components/detail-windmill-modal/detail-windmill-modal.component';
import { ModalDeletePartComponent } from './components/modales/modal-delete-part/modal-delete-part.component';
import { ModalAddPartComponent } from './components/modales/modal-add-part/modal-add-part.component';
import { WindmillPartCreationComponent } from './components/windmill-part-creation/windmill-part-creation.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from './components/delete-user-modal/delete-user-modal.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    ListComponent,
    FooterComponent,
    ModalDeletePartComponent,
    ModalAddPartComponent,
    WindmillPartCreationComponent,
    UserDashboardComponent,
    UserComponent,
    EditUserModalComponent,
    DeleteUserModalComponent,
    DragAndDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
