import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   update(user: User, id: string) : Observable<any>{
    let body = new HttpParams();
    body = body.set("_id", user._id.trim());
    body = body.set("name", user.name.trim());
    body = body.set("email", user.email.trim());
    body = body.set("phone", user.phone.trim());
    body = body.set("password", user.password.trim());
    body = body.set("admin", String(user.admin));
    return this.http.put<any>(this.backendUrl + id, body, {observe: "response"});
  }
  backendUrl = "http://localhost:8085/api/user/";

  listAll(): Observable<User[]>{
    return this.http.get<any>(this.backendUrl + "listAll");
  }

  listOne(id: string): Observable<User>{
    return this.http.get<User>(this.backendUrl + id);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(this.backendUrl + id, {observe: "response"});
  }


  constructor(private http: HttpClient) { }
}
