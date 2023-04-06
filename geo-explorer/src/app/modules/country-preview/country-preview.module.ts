import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryPreviewComponent } from './page/country-preview.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CountryPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CountryPreviewModule { }
