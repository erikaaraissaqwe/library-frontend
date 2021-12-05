import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BookUser } from '../models/BookUser';

@Injectable({
  providedIn: 'root'
})
export class BookUserService {
   backendUrl = "http://localhost:8085/api/userBook/";

   register(bookUser : BookUser): Observable<any> {
    let body = new HttpParams();
    body = body.set("bookId", bookUser.bookId);
    body = body.set("userId", bookUser.userId);
    body = body.set("loadDate",  String(bookUser.loadDate));
    body = body.set("expectedDeliveryDate", String(bookUser.expectedDeliveryDate));
   
    return this.http.post<any>(this.backendUrl + "loan", body, {observe: "response"});
  }

  listOne(id: string): Observable<BookUser>{
    return this.http.get<BookUser>(this.backendUrl  + id);
  }

  listLateBookByUserId(id: string): Observable<BookUser[]>{
    console.log(this.backendUrl  + "listLateBooksByUserId/" + id);
    return this.http.get<BookUser[]>(this.backendUrl  + "listLateBooksByUserId/" + id);
  }

  listAllLateBooks(): Observable<BookUser[]>{
    return this.http.get<BookUser[]>(this.backendUrl  + "listAllLateBooks");
  }

  listAll(): Observable<BookUser[]>{
    return this.http.get<BookUser[]>(this.backendUrl  + "listAll");
  }

  listAllByUserId(id: string): Observable<BookUser[]>{
    console.log(this.backendUrl  + "listAllByUserId/" + id)
    return this.http.get<BookUser[]>(this.backendUrl  + "listAllByUserId/" + id);
  }
  delete(id: String, id_book: String): Observable<any> {
    return this.http.delete(this.backendUrl + id, {observe: "response"});
  }
  constructor(private http: HttpClient) { }

}
