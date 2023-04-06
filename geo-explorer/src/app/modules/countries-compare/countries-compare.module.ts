import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesCompareComponent } from './page/countries-compare.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CountriesCompareComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CountriesCompareModule { }
