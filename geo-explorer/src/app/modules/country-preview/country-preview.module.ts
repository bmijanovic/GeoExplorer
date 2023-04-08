import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CountryPreviewComponent } from './page/country-preview.component';
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";
import { CountryMapComponent } from './components/country-map/country-map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";



@NgModule({
  declarations: [
    CountryPreviewComponent,
    CountryMapComponent
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
