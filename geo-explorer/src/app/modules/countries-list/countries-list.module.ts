import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './page/countries-list.component';
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../../../infrastructure/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CountryCardComponent } from './components/country-card/country-card.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    CountriesListComponent,
    CountryCardComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        MatButtonModule
    ]
})
export class CountriesListModule { }
