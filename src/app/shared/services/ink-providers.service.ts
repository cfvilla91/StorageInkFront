import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InkProvider } from '../models/ink-provider.model';

@Injectable({
    providedIn: 'root'
})
export class InkProvidersService {

    private endpoint = environment.API_URL + 'inkProviders';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<InkProvider[]> {
        return this.http.get<InkProvider[]>(this.endpoint);
    }

    getInkProviderById(id): Observable<InkProvider> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<InkProvider>(url);
    }

    addInkProvider(inkProvider: InkProvider): Observable<InkProvider> {
        const newInkProvider = { ...inkProvider };
        return this.http.post<InkProvider>(
            this.endpoint,
            newInkProvider,
            { headers: this.httpHeaders }
        );
    }

    updateInkProvider(inkProvider: InkProvider): Observable<any> {
        const url = `${this.endpoint}/${inkProvider.Id}`;
        return this.http.put(
            url,
            inkProvider,
            { headers: this.httpHeaders }
        );
    }

    deleteInkProvider(id: number): Observable<InkProvider> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<InkProvider>(url, { headers: this.httpHeaders });
    }

}
