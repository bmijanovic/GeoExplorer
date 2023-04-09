import {ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";
import {map, Observable, startWith} from "rxjs";
import {CountryService} from "../../shared/services/country-service";
import {CountryListItem} from "../../countries-compare/components/comparison-search/comparison-search.component";
import {inputNames} from "@angular/cdk/schematics";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


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

  myControl = new FormControl<string>('');
  sortInput= new FormControl('Name');
  continentsSelected=new FormControl("");

  queryInput= new FormControl("");
  minPopulationInput= new FormControl(null);
  maxPopulationInput= new FormControl(null);

  minAreaInput= new FormControl(null);
  maxAreaInput= new FormControl(null);
  searchForm=new FormGroup(
    {
      sort:this.sortInput,
      name:this.queryInput,
      minPop:this.minPopulationInput,
      maxPop:this.maxPopulationInput,
      minArea:this.minAreaInput,
      maxArea:this.maxAreaInput,
      continents:this.continentsSelected,
    }
  )

  sss: any;
  isIndependent=true;
  isNotIndependent=true;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  obs: Observable<any> | undefined;
  dataSource: MatTableDataSource<CountryListItemDetailed> = new MatTableDataSource<CountryListItemDetailed>(this.filteredCountries)
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private countryService: CountryService
  ) {}
  @ViewChild('ridesPaginator') ridesPaginator!: MatPaginator;
  ngAfterViewInit(){

    this.dataSource.paginator = this.ridesPaginator;
  }

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
        this.filteredCountries.sort(this.compareNameAsc)
      }
    })


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
    let filterValue="";
    if (typeof this.myControl.value === "string")
      filterValue=this.myControl.value.toLowerCase();
    this.filteredCountries=this.options
    if (filterValue!=null && filterValue!=undefined && filterValue!="") {
      this.filteredCountries = this.filteredCountries.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    console.log(this.continentsSelected.value?.length)
    if (this.continentsSelected.value?.length!=0 &&this.continentsSelected.value!=undefined){
      this.filteredCountries=this.filteredCountries.filter(option=>this.continentsSelected.value?.includes(option.continent));
    }
    if (this.minPopulationInput.value!=null)
      this.filteredCountries=this.filteredCountries.filter(option=>option.population>=parseInt(this.minPopulationInput.value!));
    if (this.maxPopulationInput.value!=null)
      this.filteredCountries=this.filteredCountries.filter(option=>option.population<=parseInt(this.maxPopulationInput.value!));
    if (!this.isIndependent)
      this.filteredCountries=this.filteredCountries.filter(option=> !option.independent);
    if (!this.isNotIndependent)
      this.filteredCountries=this.filteredCountries.filter(option=> option.independent);
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

  clearSearch() {
    this.myControl.reset();
  }

  isSearchBlank() :boolean{
    return !(this.myControl.value == "" || this.myControl.value == null);
  }

  resetFilters() {
    this.isIndependent=true;
    this.isNotIndependent=true;
    this.searchForm.reset();
    this.filterCountries();
  }
}
