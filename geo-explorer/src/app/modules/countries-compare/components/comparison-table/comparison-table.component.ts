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
  country2!: Country;
  country2languages!: string[];
  country3!: Country;
  country3languages!: string[];
  country1Subscription: Subscription = new Subscription();
  country2Subscription: Subscription = new Subscription();
  country3Subscription: Subscription = new Subscription();
  constructor(
      private countryService: CountryService
  ) {
  }

  ngOnInit(): void {
    this.country1Subscription = this.countryService.getCountryDetails("Egypt").subscribe({
      next: (details) => {
        this.country1 = this.countryService.parseToCountry(details[0]);
        this.country1languages = Object.values(this.country1.languages)
        console.log(this.country1)
      }
    })
    this.country2Subscription = this.countryService.getCountryDetails("Canada").subscribe({
      next: (details) => {
        this.country2 = this.countryService.parseToCountry(details[0]);
        this.country2languages = Object.values(this.country2.languages)
        console.log(this.country2)
      }
    })
    this.country3Subscription = this.countryService.getCountryDetails("Kosovo").subscribe({
      next: (details) => {
        this.country3 = this.countryService.parseToCountry(details[0]);
        this.country3languages = Object.values(this.country3.languages)
        console.log(this.country3)
      }
    })
  }

  ngOnDestroy(): void {
    this.country1Subscription.unsubscribe();
    this.country2Subscription.unsubscribe();
    this.country3Subscription.unsubscribe();
  }
}


// //gets the element id that was clicked on
//   getId = (el) => {
//
//     let removeClass, classOne, classTwo;
//
//     //get element classes
//     let addClass = document.querySelectorAll(`.${el}`);
//
//     //function to add class
//     addClassFunc = () => {
//
//       //gets all classes related to the ID that was clicked on e.g. if ID clicked was titleOne then target all titleOne classes
//       addClass.forEach((el) => {
//         el.classList.add('active');
//       });
//     };
//
//     //function to remove active class - if ID clicked was titleOne we target titleTwo and titleThree classes to remove active class
//
//     removeClassFunc = () => {
//       removeClass = document.querySelectorAll(`.${classOne}, .${classTwo}`);
//       removeClass.forEach((el) => {
//         el.classList.remove('active');
//       });
//     };
//
//     //finds the columns which we remove active class from
//     if (el === 'titleOne') {
//       classOne = 'titleTwo';
//       classTwo = 'titleThree';
//
//     } else if (el === 'titleTwo') {
//       classOne = 'titleOne';
//       classTwo = 'titleThree';
//
//     } else if (el === 'titleThree') {
//       classOne = 'titleOne';
//       classTwo = 'titleTwo';
//
//     };
//
//     //call functions to remove and add active class
//     addClassFunc();
//     removeClassFunc();
//   };
// };



