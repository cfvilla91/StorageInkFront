import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    private endpoint = environment.API_URL + 'clients';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.endpoint);
    }

    getClientById(id): Observable<Client> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Client>(url);
    }

    addClient(client: Client): Observable<Client> {
        const newClient = { ...client };
        return this.http.post<Client>(
            this.endpoint,
            newClient,
            { headers: this.httpHeaders }
        );
    }

    updateClient(client: Client): Observable<any> {
        const url = `${this.endpoint}/${client.Id}`;
        return this.http.put(
            url,
            client,
            { headers: this.httpHeaders }
        );
    }

    deleteClient(id: number): Observable<Client> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Client>(url, { headers: this.httpHeaders });
    }

}
