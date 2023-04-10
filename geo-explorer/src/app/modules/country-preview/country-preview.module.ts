import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CountryPreviewComponent } from './page/country-preview.component';
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";
import { CountryMapComponent } from './components/country-map/country-map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { CountryInfoComponent } from './components/country-info/country-info.component';



@NgModule({
  declarations: [
    CountryPreviewComponent,
    CountryMapComponent,
    CountryInfoComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        NgOptimizedImage,
        RouterLink,
        LeafletModule
    ]
})
export class CountryPreviewModule { }
