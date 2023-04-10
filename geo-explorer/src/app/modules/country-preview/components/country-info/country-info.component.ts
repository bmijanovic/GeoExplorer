import {Component, Input, OnInit} from '@angular/core';
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
  @Input()
  countryName : string = ""
  constructor(private http: HttpClient, private _countryService: CountryService,
              private router: Router) {}

  ngOnInit() {
    this.loadCountryDetails(this.countryName);
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
            if (response.photos.length > 0){
              this.capitalImageUrl = response.photos[Math.floor(Math.random() * 20) % response.photos.length].src.landscape;
            }
          });

          for (let i in this.country.borders){
            if(this.country.borders[i] === "UNK" && this.country.common_name === "Albania")
              this.country.borders[i] = "SRB";
            else if(this.country.borders[i] === "UNK")
              continue

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
    const pexels_api_key = 'qHBdVvMNzr6H3yPnnLLcaP9YA9j4tbcTrJNQjTygYRzmaJoaS76filmn';
    const url = `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&per_page=20`;
    const headers = { Authorization: pexels_api_key };
    return this.http.get(url, { headers });
  }

  goToPage(countryName: String) {
    this.router.navigate(['/country/', countryName]).then(() => {
      window.location.reload();
    });
  }

  compare() {
    this._countryService.setCountryToCompare(this.country!.common_name);
    this.router.navigateByUrl("/compare");
  }
}
