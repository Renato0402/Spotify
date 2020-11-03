import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

    login(email: string, senha: string) {
        return this.httpClient.post<any>(`/users`, { email, senha })
            .pipe(map(user => {
                
                if (user) {
                    user.authData = window.btoa(email + ':' + senha);

                    localStorage.setItem('user', JSON.stringify(user));

                    this.router.navigate(['/userProfile']);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('user');
    }
}
