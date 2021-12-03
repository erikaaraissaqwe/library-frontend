import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user : User;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if(this.authenticationService.isAdmin()){
      this.router.navigate(["/error403"]);
    }
   
    let id = sessionStorage.getItem("id");
    this.getUser(id);

  }

  
  getUser(id: string): void {
    this.userService.listOne(id).pipe(first()).subscribe(
      (User) => {
        this.user = User;
      },
      (err) => {
      alert(err.error.msg);
    }
  );
}

}
