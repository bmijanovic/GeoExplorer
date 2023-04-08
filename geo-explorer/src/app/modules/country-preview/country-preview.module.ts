import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CountryPreviewComponent } from './page/country-preview.component';
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    CountryPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgOptimizedImage,
    RouterLink
  ]
})
export class CountryPreviewModule { }
