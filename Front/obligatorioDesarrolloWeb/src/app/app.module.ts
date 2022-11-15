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
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { WindmillComponent } from './components/windmill/windmill.component';
import { DetailWindmillModalComponent } from './components/detail-windmill-modal/detail-windmill-modal.component';
import { ModalDeletePartComponent } from './components/modales/modal-delete-part/modal-delete-part.component';
import { WindmillPartCreationComponent } from './components/windmill-part-creation/windmill-part-creation.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from './components/delete-user-modal/delete-user-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ModalEditWindmillPartComponent } from './components/modales/modal-edit-windmill-part/modal-edit-windmill-part.component';
import { ModalAddWindmillPartComponent } from './components/modales/modal-add-windmill-part/modal-add-windmill-part.component';

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
    WindmillPartCreationComponent,
    UserDashboardComponent,
    UserComponent,
    EditUserModalComponent,
    DeleteUserModalComponent,
    DragAndDropComponent,
    CreateUserComponent,
    ForgotPasswordComponent,
    ModalEditWindmillPartComponent,
    ModalAddWindmillPartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
