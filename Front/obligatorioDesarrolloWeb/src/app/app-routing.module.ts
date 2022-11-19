import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationComponent } from './components/creation/creation.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { ApproveComponent } from './components/approve/approve.component';
import { UserComponent } from './components/user/user.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "creation", component: CreationComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'approve', component: ApproveComponent },
  { path: 'userList', component: UserDashboardComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: "forgotPass", component: ForgotPasswordComponent },
  { path: "changePass", component: ChangePassComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }