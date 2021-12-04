import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { first } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookUserService } from 'src/app/services/book-user.service';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listAllBooks: Book[];
  isAdmin = this.authService.isAdmin();
  title: string;
  
  ngOnInit(): void {
    if (this.router.url == '/home'){
     this.loadBooks();
     this.title = "Estante";
    }
    else if (this.router.url == '/bookBorrowed'){
      this.loadBooksBorrowed();
      this.title = "Livros que estão emprestados";
    }
    else if (this.router.url == '/booksLate'){
      this.loadBooksBorrowed();
      this.title = "Livros que estão com a entrega atrasada";
    }
  }

  loadBooks(): void {
    this.bookService.listAll().pipe(first()).subscribe(
     (books) => {
      this.listAllBooks = books["data"];
     },
     (err) => {
      toast({
        message: err.error.msg,
        type: 'is-danger',
        duration: 4000,
        dismissible: true,
        position: 'bottom-center'
      });
      this.router.navigate(["/error"]);
      }
    );
  }

  loadBooksBorrowed(): void {
    this.bookService.listAllBorrowed().pipe(first()).subscribe(
     (books) => {
      this.listAllBooks = books["data"];
     },
     (err) => {
      toast({
        message: err.error.msg,
        type: 'is-danger',
        duration: 4000,
        dismissible: true,
        position: 'bottom-center'
      });
      this.router.navigate(["/error"]);
      }
    );
  }

  

  constructor( 
    private router: Router,
    private routerActivated: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthenticationService,
  ) { }


}
