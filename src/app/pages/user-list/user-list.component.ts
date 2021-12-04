import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listAllUsers: User[];

  constructor(
    private router: Router,
    private UserService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }
  
  loadUser(): void {
    this.UserService.listAll().pipe(first()).subscribe(
     (books) => {
      this.listAllUsers = books["data"];
     },
     (err) => {
      toast({
        message: err.error.msg,
        type: 'is-danger',
        dismissible: true,
        duration: 4000,
        position: 'bottom-center'
      });
      this.router.navigate(["/error"]);
      }
    );
    
   
  }
  excluir(user: User) : void{
    let id = user._id;
      this.UserService.delete(id).subscribe(
        (res) => {
        if (res.ok) {
          toast({
            message: 'O usuário foi deletado com sucesso.',
            type: 'is-success',
            duration: 4000,
            dismissible: true,
            position: 'bottom-center'
          });
          this.loadUser();
        }
      },
      (err) => {
        toast({
          message: err.error.msg,
          type: 'is-danger',
          dismissible: true,
          duration: 4000,
          position: 'bottom-center'
        });
      }
      );
  }
}
