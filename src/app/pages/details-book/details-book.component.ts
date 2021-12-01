import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
     }
    );
  }
}
