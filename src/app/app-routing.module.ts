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
import { EmprestimosComponent } from './pages/emprestimos/emprestimos.component';
import { LivrosAtrasadosAdminComponent } from './pages/livros-atrasados-admin/livros-atrasados-admin.component';
import { LivrosEmprestadosAdminComponent } from './pages/livros-emprestados-admin/livros-emprestados-admin.component';
import { UserComLivrosComponent } from './pages/user-com-livros/user-com-livros.component';
import { UserLivrosAtrasadosComponent } from './pages/user-livros-atrasados/user-livros-atrasados.component';
import { UserLivrosEmprestadosComponent } from './pages/user-livros-emprestados/user-livros-emprestados.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'registerBook', component: RegisterBookComponent, canActivate: [AuthGuardAdmin] },
  { path: 'detailsBook/:id', component: DetailsBookComponent, canActivate: [AuthGuard] },
  { path: 'updateBook/:id', component: RegisterBookComponent, canActivate: [AuthGuardAdmin] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bookBorrowed', component: EmprestimosComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userDetail', component: UserDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: 'userDetail/:id', component: UserDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: "edit", component: UserEditComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'atrasadosAdmin', component: LivrosAtrasadosAdminComponent, canActivate: [AuthGuard] },
  { path: 'emprestadosAdmin', component: LivrosEmprestadosAdminComponent, canActivate: [AuthGuard] },
  { path: 'ComLivros', component: UserComLivrosComponent, canActivate: [AuthGuard] },
  { path: 'UserAtrasados', component: UserLivrosAtrasadosComponent, canActivate: [AuthGuard] },
  { path: 'UserEmprestados', component: UserLivrosEmprestadosComponent, canActivate: [AuthGuard] },
 
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "error403", component: ErrorUnallowedComponent },
  { path: "**", component: ErrorComponent },
  { path: "error", component: ErrorComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
