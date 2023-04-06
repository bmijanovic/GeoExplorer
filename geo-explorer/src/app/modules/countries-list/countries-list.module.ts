import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './page/countries-list.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CountriesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CountriesListModule { }
