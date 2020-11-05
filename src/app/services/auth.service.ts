import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../entidades/usuario';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url;

    constructor(private httpClient: HttpClient) {
        this.url = "http://localhost:3000/api/auth/"
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    /*login(email: string, senha: string) {
        //let params = new HttpParams().set("email", email)
        //let params = { params: new HttpParams("email", email) }

        return this.httpClient.get<Usuario>(this.url+ "?email=" +window.btoa(email))
            .pipe(map(user => {

                if (user.senha == senha) {
                    localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/']);
                }
            }));

        /*return this.httpClient.get<Usuario>(this.url, {params: new HttpParams().set("email", email)})
        .pipe(map(user => {

            if (user.senha == senha) {
                localStorage.setItem('user', JSON.stringify(user));

                this.router.navigate(['/userProfile']);
            }
        }));
    }*/

    /*login(email: string, senha: string) {
        return this.httpClient.post<any>(this.url, { email, senha })
            .pipe(map(user => {
                
                if (user) {
                    user.authData = window.btoa(email + ':' + senha);

                    localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/']);
                }

                return user;
            }));
    }*/

    /*login(email: string, senha: string): Observable<any> {
        return this.httpClient.post<any>(this.url + "/login", { email: email, senha: senha }, this.httpOptions)
            .pipe(map(user => {
                
                if (user) {
                    user.authData = window.btoa(email + ':' + senha);

                    localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/']);
                }

                return user;
            }));
    }*/

    login(email: string, senha: string): Observable<any> {
        return this.httpClient.post(this.url + "login", { email: email, senha: senha }, this.httpOptions);
    }

    register(email: string, senha: string): Observable<any> {
        return this.httpClient.post(this.url + "register", { email: email, senha: senha }, this.httpOptions);
    }

    /*fazerlogin(){
        localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/userProfile']);
    }*/

    logout() {
        localStorage.removeItem('user');
    }

    getRequestWithParameters(email: string) {
        const opts = { params: new HttpParams({ fromString: email }) };
        return this.httpClient.get(this.url, opts);
    }
}
