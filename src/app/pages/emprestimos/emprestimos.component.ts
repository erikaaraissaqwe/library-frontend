import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { BookUser } from 'src/app/models/BokkUser';
import { BookUserService } from 'src/app/services/book-user.service';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.css']
})
export class EmprestimosComponent implements OnInit {
  listAllBookUsers: BookUser[];

  constructor( private BookUserService: BookUserService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(): void {
    this.BookUserService.listAll().pipe(first()).subscribe(
     (bookUsers) => {
      this.listAllBookUsers = bookUsers["data"];
     }
    );
    }
  }
