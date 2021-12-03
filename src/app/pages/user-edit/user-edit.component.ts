import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  myForm: FormGroup;

  constructor( private Userservice: UserService) { }
  userUpdate: User;

  ngOnInit(): void {
    let id = sessionStorage.getItem("id");
    this.getUser(id);
    this.initForm();
  }
  user : any;
  getUser(id: string): void {
    this.Userservice.listOne(id).pipe(first()).subscribe(
      (User) => {
        this.user = User;
      },
      (err) => {
      alert(err.error.msg);
    }
  );
}
private initForm() {
  this.myForm = new FormGroup({
  name : new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
  phone : new FormControl(null, [Validators.required, Validators.min(18)]),
  email : new FormControl(null)
  });
  }
  onSubmit() : void {
    console.log("Entrei");

  
      let id = sessionStorage.getItem("id");
      this.user = this.getUser(id);
      this.userUpdate.password = this.user.password;
      this.userUpdate.admin = this.user.admin;
      this.userUpdate._id = id;
      console.log(this.getUser(id));
      if(this.myForm.get("name").value != " "){
        this.userUpdate.name = this.myForm.get("name").value;
      }else{
        this.userUpdate.name = this.user.name;
      } if(this.myForm.get("phone").value != " "){
        this.userUpdate.phone = this.myForm.get("phone").value;
      }else{
        this.userUpdate.phone = this.user.phone;
      } if(this.myForm.get("email").value != " "){
        this.userUpdate.email = this.myForm.get("email").value;
      }else{
        this.userUpdate.email = this.user.email;
      }
      
      this.Userservice.update(this.userUpdate, id);
     
    
    }
    }
    myForm: FormGroup;


