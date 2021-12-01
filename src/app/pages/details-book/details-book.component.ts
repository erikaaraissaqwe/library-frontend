import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  book: Book;

  constructor(
    private router: Router,
    private bookService: BookService,
    private routerActivated: ActivatedRoute,) { }

    ngOnInit(): void {
    let id = this.routerActivated.snapshot.paramMap.get("id");
    console.log(id);
    this.loadBook(id);
  }

  loadBook(id: string): void {
    this.bookService.listOne(id).pipe(first()).subscribe(
     (book) => {
       console.log(book);
        this.book = book;
     },
     (err) => {
      alert(err.error.msg);
      }
    );
  }

  delete(id: string, title: string) {
    if (confirm("Remover "+ title +"?")) {
      this.bookService.delete(id).subscribe(
        (res) => {
        if (res.ok) {
          console.log(res);
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
