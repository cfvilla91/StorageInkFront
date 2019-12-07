import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TattooSession } from '../models/tattoo-session.model';

@Injectable({
    providedIn: 'root'
})
export class TattooSessionsService {

    private endpoint = environment.API_URL + 'tattooSessions';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<TattooSession[]> {
        return this.http.get<TattooSession[]>(this.endpoint);
    }

    getTattooSessionsByUserReport(): Observable<any[]> {
        const url = `${this.endpoint}/getTattooSessionsByUserReport/all`;
        return this.http.get<any[]>(url);
    }

    getTattooSessionById(id): Observable<TattooSession> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<TattooSession>(url);
    }

    getTattooSessionsByTattooId(id): Observable<TattooSession[]> {
        const url = `${this.endpoint}/getTattooSessionsByTattooId/${id}`;
        return this.http.get<TattooSession[]>(url);
    }

    addTattooSession(tattooSession: TattooSession): Observable<TattooSession> {
        const newTattooSession = { ...tattooSession };
        return this.http.post<TattooSession>(
            this.endpoint,
            newTattooSession,
            { headers: this.httpHeaders }
        );
    }

    updateTattooSession(tattooSession: TattooSession): Observable<any> {
        const url = `${this.endpoint}/${tattooSession.Id}`;
        return this.http.put(
            url,
            tattooSession,
            { headers: this.httpHeaders }
        );
    }

    startTattooSession(id): Observable<TattooSession> {
        const url = `${this.endpoint}/startTattooSession/${id}`;
        return this.http.put<TattooSession>(
            url,
            {},
            { headers: this.httpHeaders }
        );
    }

    endTattooSession(id): Observable<TattooSession> {
        const url = `${this.endpoint}/endTattooSession/${id}`;
        return this.http.put<TattooSession>(
            url,
            {},
            { headers: this.httpHeaders }
        );
    }

    deleteTattooSession(id: number): Observable<TattooSession> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<TattooSession>(url, { headers: this.httpHeaders });
    }

}
