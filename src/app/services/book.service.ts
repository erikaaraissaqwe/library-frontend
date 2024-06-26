import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  backendUrl = "https://library-backend.glitch.me/api/book/";

  register(book: Book): Observable<any> {
    let body = new HttpParams();
    body = body.set("title", book.title.trim());
    body = body.set("author", book.author.trim());
    body = body.set("dateOfPublication", book.dateOfPublication);
    body = body.set("pages", String(book.pages));
    body = body.set("isbn", book.isbn.trim());
    body = body.set("image", book.image.trim());
    body = body.set("resume", book.resume.trim());
    body = body.set("borrowed", String(book.borrowed));
    return this.http.post<any>(this.backendUrl + "register", body, {observe: "response"});
  }

  update(book: Book, id: string): Observable<any> {
    let body = new HttpParams();
    body = body.set("title", book.title.trim());
    body = body.set("author", book.author.trim());
    body = body.set("dateOfPublication", book.dateOfPublication);
    body = body.set("pages", String(book.pages));
    body = body.set("isbn", book.isbn.trim());
    body = body.set("image", book.image.trim());
    body = body.set("resume", book.resume.trim());
    body = body.set("borrowed", String(book.borrowed));
    return this.http.put<any>(this.backendUrl + id, body, {observe: "response"});
  }

  listAll(): Observable<Book[]>{
    return this.http.get<any>(this.backendUrl + "listAll");
  }

  listAllBorrowed(): Observable<Book[]>{
    return this.http.get<any>(this.backendUrl + "listAllBorrowed");
  }

  listOne(id: string): Observable<Book>{
    return this.http.get<Book>(this.backendUrl + id);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(this.backendUrl + id, {observe: "response"});
  }

  constructor(private http: HttpClient) { }
}
