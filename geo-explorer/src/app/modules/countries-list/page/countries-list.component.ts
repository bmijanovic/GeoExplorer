import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";
import {BehaviorSubject} from "rxjs";
import {CountryService} from "../../shared/services/country-service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
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

export class CountriesListComponent implements  OnInit,AfterViewInit{

  sortDirection="arrow_upward";
  criteriums=["Name","Population","Area","Continent"];
  advancedSearchIcon="tune"
  collapsed=true
  continents= ["Europe","Asia","North America","South America","Africa","Antartica","Oceania"];
  options: CountryListItemDetailed[] = [];
  filteredCountries:CountryListItemDetailed[]=[];
  previewCountries:CountryListItemDetailed[]=[];
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
      name:this.queryInput,
      minPop:this.minPopulationInput,
      maxPop:this.maxPopulationInput,
      minArea:this.minAreaInput,
      maxArea:this.maxAreaInput,
      continents:this.continentsSelected,
    }
  )
  isIndependent=true;
  isNotIndependent=true;
  dataSource= new MatTableDataSource<CountryListItemDetailed>();
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  obs:  BehaviorSubject<CountryListItemDetailed[]>;
  @ViewChild('ridesPaginator') ridesPaginator!: MatPaginator;
  constructor(private changeDetectorRef: ChangeDetectorRef, private countryService: CountryService) {
    this.obs = this.dataSource.connect();
  }

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
        this.filteredCountries.sort(this.compareNameAsc);
        this.filterCountries();
      }
    })
  }

  filterCountries(){
    let filterValue="";
    if (typeof this.myControl.value === "string")
      filterValue=this.myControl.value.toLowerCase();
    this.filteredCountries=this.options
    this.sortCountries();
    if (filterValue != null && filterValue!="")
      this.filteredCountries = this.filteredCountries.filter(option => option.name.toLowerCase().includes(filterValue));
    if (this.continentsSelected.value?.length != 0 && this.continentsSelected.value != undefined)
      this.filteredCountries=this.filteredCountries.filter(option=>this.continentsSelected.value?.includes(option.continent));
    if (this.minPopulationInput.value!=null && this.minPopulationInput.valid)
      this.filteredCountries=this.filteredCountries.filter(option=>option.population>=parseInt(this.minPopulationInput.value!));
    if (this.maxPopulationInput.value!=null  && this.maxPopulationInput.valid)
      this.filteredCountries=this.filteredCountries.filter(option=>option.population<=parseInt(this.maxPopulationInput.value!));
    if (this.minAreaInput.value!=null && this.minAreaInput.valid)
      this.filteredCountries=this.filteredCountries.filter(option=>option.area>=parseInt(this.minAreaInput.value!));
    if (this.maxAreaInput.value!=null  && this.maxAreaInput.valid)
      this.filteredCountries=this.filteredCountries.filter(option=>option.area<=parseInt(this.maxAreaInput.value!));
    if (!this.isIndependent)
      this.filteredCountries=this.filteredCountries.filter(option=> !option.independent);
    if (!this.isNotIndependent)
      this.filteredCountries=this.filteredCountries.filter(option=> option.independent);
    this.previewCountries=this.filteredCountries.slice(this.pageSize*this.currentPage,this.pageSize*this.currentPage+this.pageSize);
    this.dataSource.data = this.previewCountries;
    setTimeout(() => {
      this.ridesPaginator.pageIndex = this.currentPage;
      this.ridesPaginator.length = this.filteredCountries.length;
    });
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
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.filterCountries();
  }
  private compareNameAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  private compareNameDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.name < b.name ){
      return 1;
    }
    if ( a.name > b.name ){
      return -1;
    }
    return 0;
  }
  private compareContinentAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.continent < b.continent ){
      return -1;
    }
    if ( a.continent > b.continent ){
      return 1;
    }
    return 0;
  }
  private compareContinentDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.continent < b.continent ){
      return 1;
    }
    if ( a.continent > b.continent ){
      return -1;
    }
    return 0;
  }
  private comparePopulationAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.population < b.population ){
      return -1;
    }
    if ( a.population > b.population ){
      return 1;
    }
    return 0;
  }
  private comparePopulationDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.population < b.population ){
      return 1;
    }
    if ( a.population > b.population ){
      return -1;
    }
    return 0;
  }
  private compareAreaAsc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.area < b.area ){
      return -1;
    }
    if ( a.area > b.area ){
      return 1;
    }
    return 0;
  }
  private compareAreaDesc( a:CountryListItemDetailed, b:CountryListItemDetailed ) {
    if ( a.area < b.area ){
      return 1;
    }
    if ( a.area > b.area ){
      return -1;
    }
    return 0;
  }
}
