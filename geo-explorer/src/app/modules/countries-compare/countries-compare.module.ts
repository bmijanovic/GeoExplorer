import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCompareComponent } from './page/countries-compare.component';
import {SharedModule} from "../shared/shared.module";
import { ComparisonTableComponent } from './components/comparison-table/comparison-table.component';
import { ComparisonSearchComponent } from './components/comparison-search/comparison-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    CountriesCompareComponent,
    ComparisonTableComponent,
    ComparisonSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    RouterLink
  ]
})
export class CountriesCompareModule { }
