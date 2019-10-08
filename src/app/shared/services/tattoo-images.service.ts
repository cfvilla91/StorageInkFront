import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TattooImage } from '../models/tattoo-image.model';

@Injectable({
    providedIn: 'root'
})
export class TattooImagesService {

    private endpoint = environment.API_URL + 'tattooImages';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<TattooImage[]> {
        return this.http.get<TattooImage[]>(this.endpoint);
    }

    getTattooImageById(id): Observable<TattooImage> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<TattooImage>(url);
    }

    getTattooImagesByTattooId(id): Observable<TattooImage[]> {
        const url = `${this.endpoint}/getTattooImagesByTattooId/${id}`;
        return this.http.get<TattooImage[]>(url);
    }

    addTattooImage(tattooImage: TattooImage): Observable<TattooImage> {
        const newTattooImage = { ...tattooImage };
        return this.http.post<TattooImage>(
            this.endpoint,
            newTattooImage,
            { headers: this.httpHeaders }
        );
    }

    updateTattooImage(tattooImage: TattooImage): Observable<any> {
        const url = `${this.endpoint}/${tattooImage.Id}`;
        return this.http.put(
            url,
            tattooImage,
            { headers: this.httpHeaders }
        );
    }

    deleteTattooImage(id: number): Observable<TattooImage> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<TattooImage>(url, { headers: this.httpHeaders });
    }

}
