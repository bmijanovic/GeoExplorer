import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./modules/shared/shared.module";
import {CountryPreviewModule} from "./modules/country-preview/country-preview.module";
import {CountriesListModule} from "./modules/countries-list/countries-list.module";
import {CountriesCompareModule} from "./modules/countries-compare/countries-compare.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CountryPreviewModule,
    CountriesListModule,
    CountriesCompareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
