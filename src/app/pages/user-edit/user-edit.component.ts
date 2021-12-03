import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  myForm: FormGroup;
  user : User;
  isLoading = false;
  hasErrorServer = false;
  msgServerError: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    let id = sessionStorage.getItem("id");
    this.getUser(id);
   
  }

  getUser(id: string): void {
    this.userService.listOne(id).pipe(first()).subscribe(
      (User) => {
        this.user = User;
        this.setUser(User);
      },
      (err) => {
        alert(err.error.msg);
      }
    );
  }

private initForm() {
  this.myForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl({value: "", disabled: true}, [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(13),
      Validators.pattern('^[0-9]+$')
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
  });
  }

  setUser(user: User): void {
    this.myForm.setValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      password: "",
    });
  }

  onSubmit() : void {
      const userUpdate = {
        _id: this.user._id,
        name: this.myForm.get('name').value,
        email: this.user.email,
        admin: false,
        password:  this.myForm.get('password').value,
        phone: this.myForm.get('phoneNumber').value,
      };
    
      this.userService.update(userUpdate,this.user._id).subscribe(
        (data) => {
          alert("Atualizado com sucesso.");
          this.router.navigate(['/perfil']);
        },
        (err) => {
          this.msgServerError = err.error.msg;
          this.hasErrorServer = true;
          this.isLoading = false;
        }
      );
    }
}
   


