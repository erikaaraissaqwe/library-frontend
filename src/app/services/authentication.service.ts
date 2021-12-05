import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userBackendUrl = "https://library-backend.glitch.me/api/user";
  admBackendUrl = "https://library-backend.glitch.me/api/admin";

  constructor(private http: HttpClient) {
   
  }

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
            sessionStorage.setItem("id", res.body.data._id);
          }
          return res;
        }
    ));
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiresIn");
    sessionStorage.removeItem("id");
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