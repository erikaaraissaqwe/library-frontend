import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;
  isLoading = false;
  phone: string;
  hasErrorServer = false;
  msgServerError: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    console.log(this.formSignup.get("phoneNumber").errors);
  }

  initForm() {
    this.formSignup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]+$')
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }
  
  onSubmit(): void {
    if (this.formSignup.valid) {
      this.isLoading = true;
      const newUser = {
        id: "",
        name: this.formSignup.get('name').value,
        email: this.formSignup.get('email').value,
        password: this.formSignup.get('newPassword').value,
        phone: this.formSignup.get('phoneNumber').value,
      };

      this.authenticationService
        .signIn(newUser)
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
}
