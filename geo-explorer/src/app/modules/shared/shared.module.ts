import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
    exports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        BrowserModule,
    ]
})
export class SharedModule { }
