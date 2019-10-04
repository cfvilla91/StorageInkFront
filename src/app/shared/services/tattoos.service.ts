import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tattoo } from '../models/tattoo.model';

@Injectable({
    providedIn: 'root'
})
export class TattoosService {

    private endpoint = environment.API_URL + 'tattoos';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<Tattoo[]> {
        return this.http.get<Tattoo[]>(this.endpoint);
    }

    getTattooById(id): Observable<Tattoo> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Tattoo>(url);
    }

    addTattoo(tattoo: Tattoo): Observable<Tattoo> {
        const newTattoo = { ...tattoo };
        return this.http.post<Tattoo>(
            this.endpoint,
            newTattoo,
            { headers: this.httpHeaders }
        );
    }

    updateTattoo(tattoo: Tattoo): Observable<any> {
        const url = `${this.endpoint}/${tattoo.Id}`;
        return this.http.put(
            url,
            tattoo,
            { headers: this.httpHeaders }
        );
    }

    deleteTattoo(id: number): Observable<Tattoo> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Tattoo>(url, { headers: this.httpHeaders });
    }

}
