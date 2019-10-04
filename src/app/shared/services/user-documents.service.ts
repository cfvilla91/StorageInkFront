import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDocument } from '../models/user-document.model';

@Injectable({
    providedIn: 'root'
})
export class UserDocumentsService {

    private endpoint = environment.API_URL + 'userDocuments';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<UserDocument[]> {
        return this.http.get<UserDocument[]>(this.endpoint);
    }

    getUserDocumentById(id): Observable<UserDocument> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<UserDocument>(url);
    }

    getUserDocumentsByUserId(id): Observable<UserDocument[]> {
        const url = `${this.endpoint}/getUserDocumentsByUserId/${id}`;
        return this.http.get<UserDocument[]>(url);
    }

    addUserDocument(userDocument: UserDocument): Observable<UserDocument> {
        const newUserDocument = { ...userDocument };
        return this.http.post<UserDocument>(
            this.endpoint,
            newUserDocument,
            { headers: this.httpHeaders }
        );
    }

    updateUserDocument(userDocument: UserDocument): Observable<any> {
        const url = `${this.endpoint}/${userDocument.Id}`;
        return this.http.put(
            url,
            userDocument,
            { headers: this.httpHeaders }
        );
    }

    deleteUserDocument(id: number): Observable<UserDocument> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<UserDocument>(url, { headers: this.httpHeaders });
    }

}
