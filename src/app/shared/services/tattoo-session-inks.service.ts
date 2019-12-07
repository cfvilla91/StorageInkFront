import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TattooSessionInk } from '../models/tattoo-session-ink.model';

@Injectable({
    providedIn: 'root'
})
export class TattooSessionInksService {

    private endpoint = environment.API_URL + 'tattooSessionInks';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<TattooSessionInk[]> {
        return this.http.get<TattooSessionInk[]>(this.endpoint);
    }

    getTattooSessionInkById(id): Observable<TattooSessionInk> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<TattooSessionInk>(url);
    }

    getTattooSessionInksByTattooSessionId(id): Observable<TattooSessionInk[]> {
        const url = `${this.endpoint}/getTattooSessionInksByTattooSessionId/${id}`;
        return this.http.get<TattooSessionInk[]>(url);
    }

    addTattooSessionInk(tattooSessionInk: TattooSessionInk): Observable<TattooSessionInk> {
        const newTattooSessionInk = { ...tattooSessionInk };
        return this.http.post<TattooSessionInk>(
            this.endpoint,
            newTattooSessionInk,
            { headers: this.httpHeaders }
        );
    }

    updateTattooSessionInk(tattooSessionInk: TattooSessionInk): Observable<any> {
        const url = `${this.endpoint}/${tattooSessionInk.Id}`;
        return this.http.put(
            url,
            tattooSessionInk,
            { headers: this.httpHeaders }
        );
    }

    deleteTattooSessionInk(id: number): Observable<TattooSessionInk> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<TattooSessionInk>(url, { headers: this.httpHeaders });
    }

}
