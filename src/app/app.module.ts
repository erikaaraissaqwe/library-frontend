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
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './pages/home/home.component';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ButtonBackComponent,
    ErrorFormPipe,
    HomeComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers:  [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthenticationService,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
