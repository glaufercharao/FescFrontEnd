import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';


@Injectable()
export class TokenInterceptors implements HttpInterceptor{
    constructor(private tok: AuthenticationService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = localStorage.getItem('token');
        if(token){
           const newRequest = request.clone({setHeaders:{'Authorization': `Bearer ${token}`}})
           return next.handle(newRequest);
        }else{
            return next.handle(request);
        }

    }
}