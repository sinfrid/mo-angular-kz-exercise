import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  DoCheck
} from "@angular/core";
import { tileLayer, latLng, marker, Marker } from "leaflet";
import { SharedService } from "../services/shared.service";
import { MeasurementsService } from "../services/measurements.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  map;
  mapbounds = [];
  options = {
    layers: [tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  constructor(
    private sharedService: SharedService,
    private measurementsService: MeasurementsService
  ) {
    this.sharedService.refreshMap = this.refreshMap;
  }

  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.addMapMarkers("FR");
  }

  public refreshMap(event) {
    alert(event.code);
  }

  addMapMarkers(country) {
    this.mapbounds = [];

    this.measurementsService.getMeasurement(country).subscribe((res: any) => {
      for (const c of res) {
        const lat = c.coordinates["latitude"];
        const lon = c.coordinates["longitude"];

        const marker = L.marker([lat, lon]);

        marker.addTo(this.map);

        this.mapbounds.push([lat, lon]);
      }

      this.map.fitBounds(this.mapbounds);
    });
  }
}
