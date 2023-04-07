import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../../../environment/environment";
import {Country} from "../models/country";


@Injectable({
    providedIn: 'root',
})
export class CountryService {
    url = `${environment.apiHost}`;

    constructor(private http: HttpClient) {}

    getCountryDetails(name: string): Observable<any> {
        return this.http.get<any>(`${this.url}/name/${name}`);
    }

    getAllCountries(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/all`);
    }

    parseToCountry(details: any): Country {
        let country = <Country>{
            common_name: details.name.common,
            flag_png: details.flags.png,
            coat_of_arm: details.coatOfArms.png,
            capital: details.capital,
            continents: details.continents,
            population: details.population,
            area: details.area,
            timezones: details.timezones,
            languages: details.languages,
            is_independent: details.independent,
            status: details.status
        }
        return country;
    }

}
