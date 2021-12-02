import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
