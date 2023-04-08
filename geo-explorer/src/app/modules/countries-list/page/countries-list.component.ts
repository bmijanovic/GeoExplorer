import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(300 + 'ms ease-in')),
      transition('true => false', animate(300 + 'ms ease-out'))
    ])
  ]
})
export class CountriesListComponent implements  OnInit{

  searchForm: any;
  sortDirection="arrow_upward";
  criteriums=["Date","Population"];
  advancedSearchIcon="tune"
  collapsed=true
  icon:any;
  continents= ["Europe","Asia","North America","South America","Africa","Antartica"];
  continentsSelected=new FormControl("");
  isIndepentent= false;
  checkboxControl = new FormControl(false);


  changeDirection() {
    if (this.sortDirection=="arrow_upward")
      this.sortDirection="arrow_downward"
    else
      this.sortDirection="arrow_upward"
  }

  showAdvanced() {
    if (this.collapsed){
      this.advancedSearchIcon="expand_less";
      this.collapsed = !this.collapsed;
    }
    else {
      this.advancedSearchIcon="tune";
      this.collapsed = !this.collapsed;
    }

  }

  ngOnInit(): void {
    document.getElementById("searchFormField")?.focus();
  }
}
