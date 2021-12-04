import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookUser } from '../models/BokkUser';

@Injectable({
  providedIn: 'root'
})
export class BookUserService {
 
  backendUrl: "http://localhost:8085/api/bookUser/";

   register(bookUser : BookUser): Observable<any> {
    let body = new HttpParams();
    body = body.set("_id", bookUser._id);
    body = body.set("bookId", bookUser.bookId);
    body = body.set("userId", bookUser.userId);
    body = body.set("loadDate", bookUser.loadDate);
    body = body.set("expectedDeliveryDate", String(bookUser.expectedDeliveryDate));
    body = body.set("actualDeliveryDate", bookUser.actualDeliveryDate);
   
    console.log(bookUser);
    return this.http.post<any>(this.backendUrl + "/emprestimo", body, {observe: "response"});
  }
  

  listAll(): Observable<BookUser[]>{
    return this.http.get<any>(this.backendUrl + "/bookBorrowed");
  }

  listOne(id: string): Observable<BookUser>{
    return this.http.get<BookUser>(this.backendUrl + id);
  }

  constructor(private http: HttpClient) { }

}
