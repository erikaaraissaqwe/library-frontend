import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  backendUrl = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) {}

  login(user: User) {
    let body = new HttpParams();
    body = body.set("email", user.email);
    body = body.set("password", user.password);
    return this.http.post<any>(this.backendUrl + "/login", body, {observe: "response"}).pipe(
      map(
        res => {
          if(res.body["token"] && res.body["expiry"]){
            sessionStorage.setItem("token", res.body["token"]);
            sessionStorage.setItem("expiry", res.body["expiry"]);
            sessionStorage.setItem("userName", res.body["userName"]);
          }
          return res;
        }
    ));
  }

  signIn(user: User) {
    let body = new HttpParams();
    body = body.set("name", user.name);
    body = body.set("email", user.email);
    body = body.set("phone", user.phone);
    body = body.set("password", user.password);
    return this.http.post<any>(this.backendUrl + '/signup', body, {observe: "response"}).pipe(
      map(
        res => {
          if(res.body.token && res.body.data._id){
            sessionStorage.setItem("token", res.body.token);
            sessionStorage.setItem("id", res.body.data._id);
          }
          return res;
        }
    ));
  }

  logout() {
    sessionStorage.removeItem("token");
  }

  isLogged(): boolean {
    if (sessionStorage.getItem("token") != null){
        return true;
    }
    this.logout();
    return false;
  }
}
