import {Component, OnInit} from '@angular/core';
import {Country} from "../../../shared/models/country";
import {CountryService} from "../../../shared/services/country-service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit{
  country: Country | undefined;
  borderCountries : Country[] = []
  languages: string[] = []
  capitalImageUrl: string = ""
  constructor(private http: HttpClient, private _countryService: CountryService,
              private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const countryName = params['countryName'];
      this.loadCountryDetails(countryName);
    });
  }

  loadCountryDetails(countryName: string) {
    this._countryService.getCountryDetails(countryName).subscribe({
      next: (details) => {
        if(details != null)
        {
          this.country = this._countryService.parseToCountry(details[0]);
          this.borderCountries = [];
          this.languages = Object.values(this.country.languages);

          this.searchPhotos(this.country.capital).subscribe((response) => {
            this.capitalImageUrl = response.photos[Math.floor(Math.random() * 20)].src.landscape;
          });

          for (let i in this.country.borders){
            this._countryService.getCountryDetailsByCode(this.country.borders[i]).subscribe({
              next: (details) => {
                this.borderCountries.push(this._countryService.parseToCountry(details[0]));
              },
              error: (err) => {
                alert("Country does not exist")
              }
            });
          }
        }
      },
      error: (err) => {
        alert("Country does not exist")
      }
    } )
  }

  searchPhotos(query: string) : Observable<any> {
    const apiKey = '';
    const url = `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&per_page=20`;
    const headers = { Authorization: apiKey };
    return this.http.get(url, { headers });
  }

  goToPage(countryName: String) {
    this.router.navigate(['/country/', countryName]).then(() => {
      window.location.reload();
    });
  }

  protected readonly window = window;
}
