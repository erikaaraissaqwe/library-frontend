import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listAllBooks: Book[];
  isAdmin = this.authService.isAdmin();
  @Input() user: User;
  // @Output() userLogout = new EventEmitter();
  
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.listAll().pipe(first()).subscribe(
     (books) => {
      this.listAllBooks = books["data"];
     }
    );
  }

  constructor( 
    private router: Router,
    private bookService: BookService,
    private authService: AuthenticationService
  ) { }


}
