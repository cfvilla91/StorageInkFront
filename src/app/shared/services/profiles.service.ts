import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {

    private endpoint = environment.API_URL + 'profiles';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }


    getAll(): Observable<Profile[]> {
        return this.http.get<Profile[]>(this.endpoint);
    }

    getProfileById(id): Observable<Profile> {
        const url = `${this.endpoint}/${id}`;
        return this.http.get<Profile>(url);
    }

    addProfile(profile: Profile): Observable<Profile> {
        const newProfile = { ...profile };
        return this.http.post<Profile>(
            this.endpoint,
            newProfile,
            { headers: this.httpHeaders }
        );
    }

    updateProfile(profile: Profile): Observable<any> {
        const url = `${this.endpoint}/${profile.Id}`;
        return this.http.put(
            url,
            profile,
            { headers: this.httpHeaders }
        );
    }

    deleteProfile(id: number): Observable<Profile> {
        const url = `${this.endpoint}/${id}`;
        return this.http.delete<Profile>(url, { headers: this.httpHeaders });
    }

}
