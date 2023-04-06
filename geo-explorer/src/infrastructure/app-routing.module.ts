import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CountriesListComponent} from "../app/modules/countries-list/page/countries-list.component";
import {CountriesCompareComponent} from "../app/modules/countries-compare/page/countries-compare.component";
import {CountryPreviewComponent} from "../app/modules/country-preview/page/country-preview.component";

const routes: Routes = [
  {path: 'home', component: CountriesListComponent},
  {path: 'country/:countryId', component: CountryPreviewComponent},
  {path: 'compare', component: CountriesCompareComponent},
  {path: '**',  redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
