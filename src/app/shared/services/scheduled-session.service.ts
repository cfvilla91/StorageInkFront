import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduledSession } from '../models/scheduled-session.model';

@Injectable({
    providedIn: 'root'
})
export class ScheduledSessionsService {

    private endpoint = environment.API_URL + 'scheduledSessions';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<ScheduledSession[]> {
        return this.http.get<ScheduledSession[]>(this.endpoint);
    }

    getScheduledSessionById(id): Observable<ScheduledSession> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<ScheduledSession>(url);
    }

    getScheduledSessionsByUserId(id): Observable<ScheduledSession[]> {
        const url = `${this.endpoint}/getScheduledSessionsByUserId/${id}`;
        return this.http.get<ScheduledSession[]>(url);
    }

    addScheduledSession(scheduledSession: ScheduledSession): Observable<ScheduledSession> {
        const newScheduledSession = { ...scheduledSession };
        return this.http.post<ScheduledSession>(
            this.endpoint,
            newScheduledSession,
            { headers: this.httpHeaders }
        );
    }

    updateScheduledSession(scheduledSession: ScheduledSession): Observable<any> {
        const url = `${this.endpoint}/${scheduledSession.Id}`;
        return this.http.put(
            url,
            scheduledSession,
            { headers: this.httpHeaders }
        );
    }

    deleteScheduledSession(id: number): Observable<ScheduledSession> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<ScheduledSession>(url, { headers: this.httpHeaders });
    }

}
