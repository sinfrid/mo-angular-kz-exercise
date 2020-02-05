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

// Service to get data from  the OPEN AQ API
@Injectable()
export class CitiesService {
  private cityUrl = "https://api.openaq.org/v1/cities?country="; // URL to web api

  constructor(private http: HttpClient) {}

  // Service to get city data by country
  getCitiesByCountry(country) {
    return this.http
      .get(this.cityUrl + country)
      .pipe(map(result => result["results"]));
  }
}
