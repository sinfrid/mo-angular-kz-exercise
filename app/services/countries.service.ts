import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from "rxjs/operators";
import { LatLngExpression } from "leaflet";

@Injectable()
export class CountriesService {
  private countryUrl = "https://api.openaq.org/v1/countries"; // URL to web api

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get(this.countryUrl)
      .pipe(map(result => result["results"]));
  }
}
