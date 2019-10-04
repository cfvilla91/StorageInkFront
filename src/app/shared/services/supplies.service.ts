import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supply } from '../models/supply.model';

@Injectable({
    providedIn: 'root'
})
export class SuppliesService {

    private endpoint = environment.API_URL + 'supplies';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<Supply[]> {
        return this.http.get<Supply[]>(this.endpoint);
    }

    getSupplyById(id): Observable<Supply> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Supply>(url);
    }

    addSupply(supply: Supply): Observable<Supply> {
        const newSupply = { ...supply };
        return this.http.post<Supply>(
            this.endpoint,
            newSupply,
            { headers: this.httpHeaders }
        );
    }

    updateSupply(supply: Supply): Observable<any> {
        const url = `${this.endpoint}/${supply.Id}`;
        return this.http.put(
            url,
            supply,
            { headers: this.httpHeaders }
        );
    }

    deleteSupply(id: number): Observable<Supply> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Supply>(url, { headers: this.httpHeaders });
    }

}
