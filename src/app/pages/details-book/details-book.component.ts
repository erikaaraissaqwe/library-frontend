import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';
import { Book } from 'src/app/models/Book';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { BookUserService } from 'src/app/services/book-user.service';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {
  bookUser = {bookId : "", userId: "", loadDate: "", expectedDeliveryDate: "", actualDeliveryDate: "", timestamps: true};
  book: Book;
  isAdmin = this.authService.isAdmin();
  
  constructor(
    private router: Router,
    private bookService: BookService,
    private routerActivated: ActivatedRoute,
    private authService: AuthenticationService,
    private BookUserService: BookUserService
  ) { }

    ngOnInit(): void {
    let id = this.routerActivated.snapshot.paramMap.get("id");
    this.loadBook(id);
  }

  loadBook(id: string): void {
    this.bookService.listOne(id).pipe(first()).subscribe(
     (book) => {
        this.book = book;
     },
     (err) => {
      this.router.navigate(["/error"]);
      }
    );
  }
emprestar(idBook:string){
  let id = sessionStorage.getItem("id");
  this.bookUser.bookId = idBook;
  this.bookUser.userId = id;
  this.bookUser.loadDate = String(new Date());
  this.bookUser.expectedDeliveryDate = "";
  this.bookUser.actualDeliveryDate = "";

  this.BookUserService.register(this.bookUser);
  console.log(this);
}
  delete(id: string, title: string) {
    if (confirm("Remover "+ title +"?")) {
      this.bookService.delete(id).subscribe(
        (res) => {
        if (res.ok) {
          alert("O livro foi deletado com sucesso");
          this.router.navigate(["/home"]);
        }
      },
      (err) => {
        alert(err.error.msg);
      }
      );
    }
  }
}
