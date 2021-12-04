import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { BookUserService } from '../../services/book-user.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-user-table',
  templateUrl: './book-user-table.component.html',
  styleUrls: ['./book-user-table.component.css']
})
export class BookUserTableComponent implements OnInit {

  listAllBooks = [];
  isAdmin = this.authService.isAdmin();
  title: string;
  
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthenticationService,
    private bookUserService: BookUserService
  ) { }

  loadBooksLate(): void {
    this.bookUserService.listAllLateBooks().pipe(first()).subscribe(
     (booksUser) => {
      this.listAllBooks = booksUser["data"];
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

  loadBooks(): void {
    this.bookUserService.listAll().pipe(first()).subscribe(
     (booksUser) => {
      this.listAllBooks = booksUser["data"];
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

  loadBooksByUserId(): void {
    let id = sessionStorage.getItem("id");
    this.bookUserService.listAllByUserId(id).pipe(first()).subscribe(
     (booksUser) => {
      console.log(booksUser["data"])
      this.listAllBooks = booksUser["data"];
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

  loadBooksLateByUserId(): void {
    let id = sessionStorage.getItem("id");
    this.bookUserService.listLateBookByUserId(id).pipe(first()).subscribe(
     (booksUser) => {
       console.log(booksUser["data"])
      this.listAllBooks = booksUser["data"];
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

  ngOnInit(): void {
    if (this.router.url == '/booksLate'){
      if(this.isAdmin){
        this.loadBooksLate();
        this.title = "Livros com a entrega atrasada";
      }else{
        this.router.navigate(['/error403']);
      }
     }
     else if (this.router.url == '/loadBooksUsers'){
      if(this.isAdmin){
        this.loadBooks();
        this.title = "Livros emprestados";
      }else{
        this.router.navigate(['/error403']);
      }
     }
     else if (this.router.url == '/loadBooksLateByUserId'){
      if(this.isAdmin){
        this.router.navigate(['/error403']);
      }else{
        this.loadBooksLateByUserId();
        this.title = "Seus livros com a entrega atrasada";
      }
     }
     else if (this.router.url == '/loadBooksByUserId'){
      if(this.isAdmin){
        this.router.navigate(['/error403']);
      }else{
        this.loadBooksByUserId();
        this.title = "Seus livros emprestados";
      }
     }
  }

}
