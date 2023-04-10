import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../shared/services/country-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Country} from "../../shared/models/country";

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss']
})

export class CountryPreviewComponent implements OnInit{
  countryName: string = ""
  constructor(private route: ActivatedRoute)  {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.countryName = params['countryName'];
    });
  }
}
