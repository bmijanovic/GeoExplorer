import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCompareComponent } from './page/countries-compare.component';
import {SharedModule} from "../shared/shared.module";
import { ComparisonTableComponent } from './components/comparison-table/comparison-table.component';



@NgModule({
  declarations: [
    CountriesCompareComponent,
    ComparisonTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CountriesCompareModule { }
