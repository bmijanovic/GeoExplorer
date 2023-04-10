import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [

    NavbarComponent,
      FooterComponent
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
        NavbarComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
