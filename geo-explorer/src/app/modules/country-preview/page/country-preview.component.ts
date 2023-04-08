import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../shared/services/country-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Country} from "../../shared/models/country";

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})

export class CountryPreviewComponent implements OnInit{
  country: Country | undefined
  borderCountries : Country[] = []
  languages: string[] = []
  constructor(private _countryService: CountryService, private route: ActivatedRoute, private router: Router)  {
  }
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

  goToPage(countryName: String) {
    this.router.navigate(['/country', countryName])
  }
}
