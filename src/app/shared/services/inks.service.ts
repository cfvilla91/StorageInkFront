import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ink } from '../models/ink.model';

@Injectable({
    providedIn: 'root'
})
export class InksService {

    private endpoint = environment.API_URL + 'inks';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<Ink[]> {
        return this.http.get<Ink[]>(this.endpoint);
    }

    getInkById(id): Observable<Ink> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Ink>(url);
    }

    addInk(ink: Ink): Observable<Ink> {
        const newInk = { ...ink };
        return this.http.post<Ink>(
            this.endpoint,
            newInk,
            { headers: this.httpHeaders }
        );
    }

    updateInk(ink: Ink): Observable<any> {
        const url = `${this.endpoint}/${ink.Id}`;
        return this.http.put(
            url,
            ink,
            { headers: this.httpHeaders }
        );
    }

    deleteInk(id: number): Observable<Ink> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Ink>(url, { headers: this.httpHeaders });
    }

}
