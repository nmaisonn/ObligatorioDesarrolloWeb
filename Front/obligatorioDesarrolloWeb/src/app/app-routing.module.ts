import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationComponent } from './components/creation/creation.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { ApproveComponent } from './components/approve/approve.component';
import { UserComponent } from './components/user/user.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "creation", component: CreationComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'approve', component:ApproveComponent},
  { path: 'userList',component:UserDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }