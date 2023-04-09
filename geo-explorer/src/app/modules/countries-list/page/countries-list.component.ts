import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";
import {map, Observable, startWith} from "rxjs";
import {CountryService} from "../../shared/services/country-service";
import {CountryListItem} from "../../countries-compare/components/comparison-search/comparison-search.component";
import {inputNames} from "@angular/cdk/schematics";


export interface CountryListItemDetailed{
  name:string;
  continent:string;
  population:number;
  area:number;
  independent:boolean;
  capital:string;
  flag:any;
}
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

  sortDirection="arrow_upward";
  criteriums=["Name","Population","Area","Continent"];
  advancedSearchIcon="tune"
  collapsed=true
  continents= ["Europe","Asia","North America","South America","Africa","Antartica"];

  options: CountryListItemDetailed[] = [];
  filteredCountries:CountryListItemDetailed[]=[];
  filteredOptions!: Observable<CountryListItemDetailed[]>;
  countryEvent = new EventEmitter<string>();

  myControl = new FormControl<string | CountryListItemDetailed>('');
  sortInput= new FormControl('Name');
  continentsSelected=new FormControl("");

  queryInput= new FormControl("");
  searchForm=new FormGroup(
    {
      sort:this.sortInput,
      name:this.queryInput
    }
  )
  minPopulationInput= new FormControl("");
  maxPopulationInput= new FormControl("");
  constructor(
    private countryService: CountryService
  ) {}


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
    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        for(let i = 0; i < countries.length; i++)
          if (countries[i].name.common!="Kosovo")
            this.options.push({
              area: countries[i].area,
              capital: countries[i].capital,
              independent: countries[i].independent,
              population: countries[i].population,
              name: countries[i].name.common,
              flag:countries[i].flags.png,
              continent:countries[i].continents[0]})
        this.filteredCountries=this.options;
      }
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        this.sendMessage(name!)
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  private _filter(name: string): CountryListItemDetailed[] {
    const filterValue = name.toLowerCase();
    this.filteredCountries= this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    return this.filteredCountries
  }

  sendMessage(name:string) {
    this.countryEvent.emit(name);
  }
  filterCountries(){
    const filterValue = this.queryInput.value?.toLowerCase();
    if (filterValue!=null)
      this.filteredCountries= this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    if (this.continentsSelected.value!="")
      this.filteredCountries=this.options.filter(option=>this.continentsSelected.value?.includes(option.continent));
   /* if (this.minPopulationInput.value!="" && this.minPopulationInput!=null)
      this.filteredCountries=this.options.filter(option=>option.population>parseInt(this.minPopulationInput.value));*/
  }

  displayFn(user: CountryListItem): string {
    return user && user.name ? user.name : '';
  }
  displayPopulation(num:number){
    if (num>1000000 && num<1000000000)
      return Math.round(num/100000)/10+"M";
    else if (num>1000000000)
      return Math.round(num/100000000)/10+"B";
    else if (num>0 && num<1000)
      return num;
    else
      return Math.round(num/100)/10+"K";

  }
  compareNameAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  compareNameDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.name < b.name ){
      return 1;
    }
    if ( a.name > b.name ){
      return -1;
    }
    return 0;
  }
  compareContinentAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.continent < b.continent ){
      return -1;
    }
    if ( a.continent > b.continent ){
      return 1;
    }
    return 0;
  }
  compareContinentDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.continent < b.continent ){
      return 1;
    }
    if ( a.continent > b.continent ){
      return -1;
    }
    return 0;
  }
  comparePopulationAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.population < b.population ){
      return -1;
    }
    if ( a.population > b.population ){
      return 1;
    }
    return 0;
  }
  comparePopulationDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.population < b.population ){
      return 1;
    }
    if ( a.population > b.population ){
      return -1;
    }
    return 0;
  }
  compareAreaAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.area < b.area ){
      return -1;
    }
    if ( a.area > b.area ){
      return 1;
    }
    return 0;
  }
  compareAreaDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.area < b.area ){
      return 1;
    }
    if ( a.area > b.area ){
      return -1;
    }
    return 0;
  }

  sortCountries() {
    if (this.sortDirection=="arrow_upward"){
      switch (this.sortInput.value) {
        case "Name":
          this.filteredCountries.sort(this.compareNameAsc);
          break;
        case "Continent":
          this.filteredCountries.sort(this.compareContinentAsc);
          break;
        case "Area":
          this.filteredCountries.sort(this.compareAreaAsc);
          break;
        case "Population":
          this.filteredCountries.sort(this.comparePopulationAsc);
          break;
      }
    }
    else {
      switch (this.sortInput.value) {
        case "Name":
          this.filteredCountries.sort(this.compareNameDesc);
          break;
        case "Continent":
          this.filteredCountries.sort(this.compareContinentDesc);
          break;
        case "Area":
          this.filteredCountries.sort(this.compareAreaDesc);
          break;
        case "Population":
          this.filteredCountries.sort(this.comparePopulationDesc);
          break;
      }
    }
  }
}
