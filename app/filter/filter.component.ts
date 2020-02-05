import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { CountriesService } from "../services/countries.service";
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
  public selectedCountry = "FR";

  constructor(
    private sharedService: SharedService,
    private countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  // Get all countries
  getCountries(): void {
    this.countriesService.getCountries().subscribe((countries: any[]) => {
      this.countries = countries;
    });
  }

  // Select on change event
  OnChange(event) {
    this.sharedService.refreshMap(event);
    this.sharedService._toggleSidebar(event);
  }
}
