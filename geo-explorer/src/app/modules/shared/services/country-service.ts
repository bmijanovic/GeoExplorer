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

    private compareCountry$ = new BehaviorSubject<string>("");
    selectedCountry$ = this.compareCountry$.asObservable();

    constructor(private http: HttpClient) {}

    setCountryToCompare(name: string) {
      this.compareCountry$.next(name);
    }

    getCountryDetails(name: string): Observable<any> {
        return this.http.get<any>(`${this.url}/name/${name}?fullText=true`);
    }

    getCountryDetailsByCode(code: string): Observable<any> {
      return this.http.get<any>(`${this.url}/alpha/${code}`);
    }

    getAllCountries(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/all`);
    }

    parseToCountry(details: any): Country {
        let country = <Country>{
            common_name: details.name.common,
            flag_png: details.flags.png,
            flag_alt: details.flags.alt,
            coat_of_arm: details.coatOfArms.png,
            capital: details.capital,
            continents: details.continents,
            population: details.population,
            area: details.area,
            timezones: details.timezones,
            languages: details.languages,
            is_independent: details.independent,
            status: details.status,
            borders: details.borders,
            map_relation_id: Number(details.maps['openStreetMaps'].split("/").slice(-1)[0])
        }
        if(country.common_name === "Serbia")
          country.map_relation_id = 9088937;
        return country;
    }



}
