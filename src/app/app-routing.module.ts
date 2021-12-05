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
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { BookUserTableComponent } from './pages/book-user-table/book-user-table.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'registerBook', component: RegisterBookComponent, canActivate: [AuthGuardAdmin] },
  { path: 'detailsBook/:id', component: DetailsBookComponent, canActivate: [AuthGuard] },
  { path: 'updateBook/:id', component: RegisterBookComponent, canActivate: [AuthGuardAdmin] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bookBorrowed', component: HomeComponent, canActivate: [AuthGuardAdmin] },
  { path: 'booksLate', component: BookUserTableComponent, canActivate: [AuthGuard] },
  { path: 'loadBooksUsers', component: BookUserTableComponent, canActivate: [AuthGuard] },
  { path: 'loadBooksByUserId', component: BookUserTableComponent, canActivate: [AuthGuard] },
  { path: 'loadBooksLateByUserId', component: BookUserTableComponent, canActivate: [AuthGuard] },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userDetail', component: UserDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userDetail/:id', component: UserDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: "edit", component: UserEditComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: "error403", component: ErrorUnallowedComponent },
  { path: "error", component: ErrorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "**", component: ErrorComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
