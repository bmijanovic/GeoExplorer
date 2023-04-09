import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
  ]

})
export class MaterialModule { }
