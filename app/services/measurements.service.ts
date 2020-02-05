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
import { Measurement } from "../classes/measurement";

// Service to get data from  the OPEN AQ API
@Injectable()
export class MeasurementsService {
  private measurementsUrl =
    "https://api.openaq.org/v1/measurements?has_geo=true&country="; // URL to web api

  constructor(private http: HttpClient) {}

// Service to get measurement data
  getMeasurement(country): Observable<Measurement[]> {
    return this.http
      .get(this.measurementsUrl + country)
      .pipe(map(result => result["results"]));
  }
}
