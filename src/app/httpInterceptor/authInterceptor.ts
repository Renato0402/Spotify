import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser:Usuario = JSON.parse(localStorage.getItem('user'));

        if (currentUser && currentUser.id) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentUser.id}`
                }
            });
        }

        return next.handle(request);
    }
}