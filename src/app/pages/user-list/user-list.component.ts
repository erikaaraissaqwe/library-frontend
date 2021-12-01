import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor( private router: Router,
    private UserService: UserService) { }
  ngOnInit(): void {
    this.loadBooks();
  }
  
  loadBooks(): void {
    this.UserService.listAll().pipe(first()).subscribe(
     (books) => {
      this.listAllUsers = books["data"];
     }
    );
   
  }

}
