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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // if (this.authenticationService.isLogged()) {
    //   this.router.navigate(['/home']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formSignup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  trimInput(input: string): void {
    const field = this.formSignup.get(input);
    if (field) {
      field.setValue(field.value.trim());
    }
  }

  onSubmit(): void {
    if (this.formSignup.valid) {
      this.isLoading = true;
      const newUser = {
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
          (error) => {
            // this.serverError.id = error.id;
            // this.serverError.hasError = true;
            this.isLoading = false;
            alert(error.error.msg);
          }
        );
    }
  }
}
