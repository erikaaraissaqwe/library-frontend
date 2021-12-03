import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  ngOnInit(): void {
    if (this.router.url == '/home'){
     this.loadBooks();
    }
    else if (this.router.url == '/bookBorrowed'){
      this.loadBooksBorrowed();
    }
  }


  loadBooks(): void {
    this.bookService.listAll().pipe(first()).subscribe(
     (books) => {
      this.listAllBooks = books["data"];
     }
    );
  }

  loadBooksBorrowed(): void {
    this.bookService.listAllBorrowed().pipe(first()).subscribe(
     (books) => {
      this.listAllBooks = books["data"];
     }
    );
  }

  constructor( 
    private router: Router,
    private routerActivated: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthenticationService
  ) { }


}
