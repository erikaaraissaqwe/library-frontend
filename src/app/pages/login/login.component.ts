import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  isLoading = false;
  hasErrorServer = false;
  msgServerError: string;
  isAdm = false;
  title: string = "Login";

  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      admin: new FormControl(false, []),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.isLoading = true;
      const user: User  = {
        id: "",
        email: this.formLogin.get('email').value,
        password: this.formLogin.get('password').value,
        admin: this.isAdm,
      };
      this.authenticationService
        .login(user, this.isAdm)
        .subscribe(
          (data) => {
            this.router.navigate(['/home']);
          },
          (err) => {
            this.msgServerError = err.error.msg;
            this.hasErrorServer = true;
            this.isLoading = false;
          }
        );
    }
  }

  onCheckChange(event){
    console.log(event.target.checked);
    if(event.target.checked){
      this.isAdm = true;
      this.title = "Login - Administrador";
    } else{
      this.isAdm = false;
      this.title = "Login";
    }
  }
}
