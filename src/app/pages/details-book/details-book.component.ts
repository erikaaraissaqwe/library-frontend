import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { BookUserService } from 'src/app/services/book-user.service';
import { toast } from 'bulma-toast';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {
  book: Book;
  isAdmin = this.authService.isAdmin();
  
  constructor(
    private router: Router,
    private bookService: BookService,
    private routerActivated: ActivatedRoute,
    private authService: AuthenticationService,
    private bookUserService: BookUserService
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


loan(id: string): void {
  let expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + 7);
  
  const bookUser = {
    userId: sessionStorage.getItem("id"),
    bookId: id,
    loadDate: String(new Date().toISOString().slice(0,10)),
    expectedDeliveryDate: String(expectedDelivery.toISOString().slice(0,10)),
  };

  this.bookUserService.register(bookUser).subscribe(
    (data) => {
      toast({
        message: 'O emprestimo foi realizado com sucesso',
        type: 'is-success',
        duration: 4000,
        dismissible: true,
        position: 'bottom-center'
      });
      this.router.navigate(["/home"]);
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
  delete(id: string, title: string) {
    if (confirm("Remover "+ title +"?")) {
      this.bookService.delete(id).subscribe(
        (res) => {
        if (res.ok) {
          toast({
            message: 'O livro foi deletado com sucesso.',
            type: 'is-success',
            duration: 4000,
            dismissible: true,
            position: 'bottom-center'
          });
          this.router.navigate(["/home"]);
        }
      },
      (err) => {
        toast({
          message: err.error.msg,
          type: 'is-danger',
          duration: 4000,
          dismissible: true,
          position: 'bottom-center'
        });
      }
      );
    }
  }
}
