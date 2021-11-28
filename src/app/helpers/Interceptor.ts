import { Injectable } from '@angular/core';
import { 
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest }
from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem("token");

        if(token){
            const cloned = req.clone({headers: req.headers.set("Authorization", "Bearer " + token)})
            return next.handle(cloned);
        }
        return next.handle(req);
    }
    
}