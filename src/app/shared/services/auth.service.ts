import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private endpoint = environment.API_URL;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }

    login(u: string, p: string): any {
        return this.http.post(
            this.endpoint + 'login',
            {
                email: u,
                password: p
            },
            {
                headers: this.httpHeaders
            }
        );
    }

    // handleLogin(loginData) {
    //     localStorage.setItem('token', loginData.access_token);
    //     const decodedToken = this.jwtHelperService.decodeToken(loginData.access_token);
    //     this.usersService.getUserById(decodedToken.sub)
    //         .subscribe(
    //             loggedUser => {
    //                 localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    //                 setTimeout(() => { this.router.navigate(['pages']); }, 500);
    //             }
    //         );
    // }

}
