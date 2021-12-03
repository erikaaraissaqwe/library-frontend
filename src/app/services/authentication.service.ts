import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userBackendUrl = "http://localhost:3333/api/user";
  admBackendUrl = "http://localhost:3333/api/admin";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem("user"))
    // );

    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  login(user: User, isAdm: boolean) {
    let backendUrl = isAdm ? this.admBackendUrl : this.userBackendUrl;
    let body = new HttpParams();
    body = body.set("email", user.email.trim());
    body = body.set("password", user.password.trim());
    return this.http.post<any>(backendUrl + "/login", body, {observe: "response"}).pipe(
      map(
        res => {
          if(res.body.token && res.body.data._id && res.body.expiresIn){
            sessionStorage.setItem("token", res.body.token);
            sessionStorage.setItem("expiresIn", res.body.expiresIn);
            sessionStorage.setItem("id", res.body.data._id);
        
            if(isAdm){
              localStorage.setItem("admin", JSON.stringify(res.body.data));
              user.admin = true;
            } else{
              localStorage.setItem("user", JSON.stringify(res.body.data));
              user.admin = false;
            }
          }
          return res;
        }
    ));
  }

  signIn(user: User) {
    let body = new HttpParams();
    body = body.set("name", user.name.trim());
    body = body.set("email", user.email.trim());
    body = body.set("phone", user.phone);
    body = body.set("password", user.password.trim());
    return this.http.post<any>(this.userBackendUrl + '/signup', body, {observe: "response"}).pipe(
      map(
        res => {
          if(res.body.token && res.body.data._id && res.body.expiresIn){
            sessionStorage.setItem("token", res.body.token);
            sessionStorage.setItem("expiresIn", res.body.expiresIn);
            localStorage.setItem("user", JSON.stringify(res.body.data));
          }
          return res;
        }
    ));
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiresIn");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  }

  isLogged(): boolean {
    if (sessionStorage.getItem("token") != null && sessionStorage.getItem("expiresIn") != null){
      if(parseInt(sessionStorage.getItem("expiresIn")) > Date.now()){
        return true;
      }
    }
    this.logout();
    return false;
  }

  isAdmin(): boolean {
    let user = JSON.parse(localStorage.getItem("admin"));
    if(this.isLogged &&
       user != null &&
        user.email === "library@gmail.com" &&
         user._id === "61a036d068c15d30b764bbda"
    ) {
      return true;
    }
    return false;
  }
}