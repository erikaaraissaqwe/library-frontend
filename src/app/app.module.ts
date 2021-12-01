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
    DetailsBookComponent
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
