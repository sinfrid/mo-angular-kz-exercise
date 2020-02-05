import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { CountriesService } from "../services/countries.service";
import { CitiesService } from "../services/cities.service";
import { TitleCasePipe } from "@angular/common";

import {
  NgSelectModule,
  NgOption,
  NgSelectComponent
} from "@ng-select/ng-select";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})

// Main filter component
export class FilterComponent implements OnInit {
  public countries = [];
  public cities = [];
  public selectedCountry = "FR";
  public selectedCity = null;

  constructor(
    private sharedService: SharedService,
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit() {
    this.getCountries();
    this.getCitiesByCountry(this.selectedCountry);
  }

  // Get all countries
  getCountries(): void {
    this.countriesService.getCountries().subscribe((countries: any[]) => {
      this.countries = countries;
    });
  }

  // Get all cities by country
  getCitiesByCountry(country): void {
    this.citiesService
      .getCitiesByCountry(country)
      .subscribe((cities: any[]) => {
        for (const c of cities) {
          c.name = this.titlecasePipe.transform(c.name);
        }
        this.cities = cities;
      });
  }

  // Select on change event
  OnChange(event) {
    this.selectedCity = null;
    if (this.selectedCountry != null) {
      this.getCitiesByCountry(this.selectedCountry);
      this.sharedService.refreshMap(event);
      this.sharedService._toggleSidebar(event);
    }
  }

  // Select on change event
  OnCityChange(event) {
    if (this.selectedCity != null) {
      this.sharedService.refreshMap(this.selectedCountry, event);
      this.sharedService._toggleSidebar(event);
    }
  }
}
