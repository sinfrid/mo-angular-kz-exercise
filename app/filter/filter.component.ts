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
export class FilterComponent implements OnInit {
  public countries = [];

  constructor(
    private sharedService: SharedService,
    private countriesService: CountriesService
  ) {}

  ngOnInit() {
    
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries().subscribe((countries: any[]) => {
      this.countries = countries;
    });
  }

  OnChange(event) {
    this.sharedService.refreshMap(event);
  }
}
