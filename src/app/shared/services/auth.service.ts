import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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

}
