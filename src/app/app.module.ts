import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { ErrorFormPipe } from './pipes/error-form.pipe';
import { HomeComponent } from './pages/home/home.component';
import { PhonePipe } from './pipes/phone.pipe';
import { Interceptor } from './helpers/Interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { RegisterBookComponent } from './pages/register-book/register-book.component';
import { TitleBookPipe } from './pipes/title-book.pipe';
import { DetailsBookComponent } from './pages/details-book/details-book.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { DatePipe } from './pipes/date.pipe';
import { ErrorComponent } from './pages/error/error.component';
import { AuthorBookPipe } from './pipes/author-book.pipe';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ErrorUnallowedComponent } from './pages/error-unallowed/error-unallowed.component';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ButtonBackComponent,
    ErrorFormPipe,
    HomeComponent,
    PhonePipe,
    NavbarComponent,
    NavbarAdminComponent,
    RegisterBookComponent,
    TitleBookPipe,
    DetailsBookComponent,
    UserListComponent,
    UserDetailComponent,
    DatePipe,
    ErrorComponent,
    AuthorBookPipe,
    PerfilComponent,
    ErrorUnallowedComponent,
    ButtonEditComponent,
    UserEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers:  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
