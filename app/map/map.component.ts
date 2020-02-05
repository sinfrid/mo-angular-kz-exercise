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
import { MarkerMetaData } from "../interfaces/marker-meta-data.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  map;
  mapbounds = [];
  markers: MarkerMetaData[] = [];
  options = {
    layers: [tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")],
    zoom: 5,
    maxZoom:9,
    minZoom: 3
  };

  constructor(
    private sharedService: SharedService,
    private measurementsService: MeasurementsService,
    private injector: Injector
  ) {
    this.sharedService.refreshMap = this.refreshMap.bind(this);
  }

  onMapReady(map) {
    this.map = map;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.addMapMarkers("FR");
  }

  public refreshMap(event) {
    this.removeMapMarkers();
    this.addMapMarkers(event.code);
  }

  addMapMarkers(country) {
    this.mapbounds = [];

    this.measurementsService.getMeasurement(country).subscribe((res: any) => {
      for (const c of res) {
        const lat = c.coordinates["latitude"];
        const lon = c.coordinates["longitude"];

        const marker = L.marker([lat, lon]);

        marker.addTo(this.map);

        this.markers.push({
          name: c.city,
          markerInstance: marker
        });

        this.mapbounds.push([lat, lon]);
      }

      this.map.fitBounds(this.mapbounds);
    });
  }

  removeMapMarkers() {
    for (const c of this.markers) {
      this.map.removeLayer(c.markerInstance);
    }
  }
}
