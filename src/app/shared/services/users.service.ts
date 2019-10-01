import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private endpoint = environment.API_URL + 'users';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.endpoint);
    }

    getUserById(id): Observable<User> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<User>(url);
    }

    addUser(user: User): Observable<User> {
        const newUser = { ...user };
        return this.http.post<User>(
            this.endpoint,
            newUser,
            { headers: this.httpHeaders }
        );
    }

    updateUser(user: User): Observable<any> {
        const url = `${this.endpoint}/${user.Id}`;
        return this.http.put(
            url,
            user,
            { headers: this.httpHeaders }
        );
    }

    deleteUser(id: number): Observable<User> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<User>(url, { headers: this.httpHeaders });
    }

}
