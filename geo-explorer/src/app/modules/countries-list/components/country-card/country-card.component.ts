import {Component, Input} from '@angular/core';
import {CountryListItemDetailed} from "../../page/countries-list.component";

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {

  @Input() country: any;

  displayPopulation(num:number){
    if (num>1000000 && num<1000000000)
      return Math.round(num/100000)/10+"M";
    else if (num>1000000000)
      return Math.round(num/100000000)/10+"B";
    else if (num>=0 && num<1000)
      return num;
    else
      return Math.round(num/100)/10+"K";

  }


}
