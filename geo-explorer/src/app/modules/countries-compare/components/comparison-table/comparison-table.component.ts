import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryService} from "../../../shared/services/country-service";
import {Observable, Subscription} from "rxjs";
import {Country} from "../../../shared/models/country";

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss']
})
export class ComparisonTableComponent implements OnInit, OnDestroy {

  country1!: Country;
  country1languages!: string[];
  isCountry1Found: boolean = false;
  country2!: Country;
  country2languages!: string[];
  isCountry2Found: boolean = false;
  country3!: Country;
  country3languages!: string[];
  isCountry3Found: boolean = false;
  country1Subscription: Subscription = new Subscription();
  country2Subscription: Subscription = new Subscription();
  country3Subscription: Subscription = new Subscription();
  selectedCountry: string = "";
  constructor(
      private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.countryService.selectedCountry$.subscribe({
      next: (name) => {
        this.selectedCountry = name;
        this.recieveCountry1(name);
      }
    })
  }

  recieveCountry1($event: string) {
    if($event == "") return;
    this.country1Subscription = this.countryService.getCountryDetails($event).subscribe({
      next: (details) => {
        if(details != null)
        {
          this.isCountry1Found = true;
          this.country1 = this.countryService.parseToCountry(details[0]);
          this.country1languages = Object.values(this.country1.languages)
          console.log(this.country1)
        }
      },
      error: err => {
        this.isCountry1Found = false;
      }
    })
  }

  recieveCountry2($event: string) {
    if($event == "") return;
    this.country2Subscription = this.countryService.getCountryDetails($event).subscribe({
      next: (details) => {
        if(details != null)
        {
          this.isCountry2Found = true;
          this.country2 = this.countryService.parseToCountry(details[0]);
          this.country2languages = Object.values(this.country2.languages)
          console.log(this.country2)
        }
      },
      error: err => {
        this.isCountry2Found = false;
      }
    })
  }

  recieveCountry3($event: string) {
    if($event == "") return;
    const btn = document.getElementById("country3btn") as HTMLButtonElement
    this.country3Subscription = this.countryService.getCountryDetails($event).subscribe({
      next: (details) => {
        if(details != null)
        {
          this.isCountry3Found = true;
          this.country3 = this.countryService.parseToCountry(details[0]);
          this.country3languages = Object.values(this.country3.languages)
          console.log(this.country3)
        }
      },
      error: err => {
        this.isCountry3Found = false;
      }
    })
  }
  ngOnDestroy(): void {
    this.country1Subscription.unsubscribe();
    this.country2Subscription.unsubscribe();
    this.country3Subscription.unsubscribe();
  }
}



