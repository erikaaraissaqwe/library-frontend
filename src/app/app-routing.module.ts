import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { DetailsBookComponent } from './pages/details-book/details-book.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterBookComponent } from './pages/register-book/register-book.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { ErrorComponent } from './pages/error/error.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuardAdmin } from './helpers/authAdmin.guard';
import { ErrorUnallowedComponent } from './pages/error-unallowed/error-unallowed.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'registerBook', component: RegisterBookComponent, canActivate: [AuthGuardAdmin] },
  { path: 'detailsBook/:id', component: DetailsBookComponent, canActivate: [AuthGuard] },
  { path: 'updateBook/:id', component: RegisterBookComponent, canActivate: [AuthGuardAdmin] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userDetail', component: UserDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userDetail/:id', component: UserDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "error405", component: ErrorUnallowedComponent },
  { path: "**", component: ErrorComponent },
  { path: "error", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
