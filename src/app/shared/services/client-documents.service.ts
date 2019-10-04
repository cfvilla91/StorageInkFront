import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDocument } from '../models/client-document.model';

@Injectable({
    providedIn: 'root'
})
export class ClientDocumentsService {

    private endpoint = environment.API_URL + 'clientDocuments';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<ClientDocument[]> {
        return this.http.get<ClientDocument[]>(this.endpoint);
    }

    getClientDocumentById(id): Observable<ClientDocument> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<ClientDocument>(url);
    }

    getClientDocumentsByClientId(id): Observable<ClientDocument[]> {
        const url = `${this.endpoint}/getClientDocumentsByClientId/${id}`;
        return this.http.get<ClientDocument[]>(url);
    }

    addClientDocument(clientDocument: ClientDocument): Observable<ClientDocument> {
        const newClientDocument = { ...clientDocument };
        return this.http.post<ClientDocument>(
            this.endpoint,
            newClientDocument,
            { headers: this.httpHeaders }
        );
    }

    updateClientDocument(clientDocument: ClientDocument): Observable<any> {
        const url = `${this.endpoint}/${clientDocument.Id}`;
        return this.http.put(
            url,
            clientDocument,
            { headers: this.httpHeaders }
        );
    }

    deleteClientDocument(id: number): Observable<ClientDocument> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<ClientDocument>(url, { headers: this.httpHeaders });
    }

}
