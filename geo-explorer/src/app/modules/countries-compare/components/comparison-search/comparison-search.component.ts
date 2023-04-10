import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {CountryService} from "../../../shared/services/country-service";


export interface CountryListItem {
  name: string;
}

@Component({
  selector: 'app-comparison-search',
  templateUrl: './comparison-search.component.html',
  styleUrls: ['./comparison-search.component.scss']
})
export class ComparisonSearchComponent implements OnInit{

  @Input()
  predefinedString: string = ""
  @Output()
  countryEvent = new EventEmitter<string>();
  myControl = new FormControl<string | CountryListItem>("");
  options: CountryListItem[] = [];
  filteredOptions!: Observable<CountryListItem[]>;
  constructor(
      private countryService: CountryService
  ) {}

  ngOnInit() {
    this.myControl.setValue({name: this.predefinedString})
    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        for(let i = 0; i < countries.length; i++)
          if(countries[i].name.common != "Kosovo")
            this.options.push({name: countries[i].name.common})
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

  displayFn(user: CountryListItem): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): CountryListItem[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  sendMessage(name:string) {
    this.countryEvent.emit(name);
  }
}
