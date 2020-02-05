import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  DoCheck
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { tileLayer, latLng, marker, Marker } from "leaflet";
import { SharedService } from "../services/shared.service";
import { MeasurementsService } from "../services/measurements.service";
import { MarkerMetaData } from "../interfaces/marker-meta-data.service";
import { MapMarkerComponent } from "../map/map-marker/map-marker.component";

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
    maxZoom: 9,
    minZoom: 3,
    zoomControl: false
  };

  constructor(
    private sharedService: SharedService,
    private measurementsService: MeasurementsService,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private datepipe: DatePipe
  ) {
    this.sharedService.refreshMap = this.refreshMap.bind(this);
  }

  onMapReady(map) {
    this.map = map;
    L.control
      .zoom({
        position: "bottomright"
      })
      .addTo(map);
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
        // dynamically instantiate a HTMLMarkerComponent
        const factory = this.resolver.resolveComponentFactory(
          MapMarkerComponent
        );

        // we need to pass in the dependency injector
        const component = factory.create(this.injector);

        const utc = this.datepipe.transform(c.date["utc"], "fullDate", "UTC");
        const local = this.datepipe.transform(
          c.date["local"],
          "fullDate",
          "UTC"
        );

        c.date["utc"] = utc;
        c.date["local"] = local;

        // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
        component.instance.data = c;

        // we need to manually trigger change detection on our in-memory component
        // s.t. its template syncs with the data we passed in
        component.changeDetectorRef.detectChanges();

        const lat = c.coordinates["latitude"];
        const lon = c.coordinates["longitude"];

        const marker = L.marker([lat, lon]);

        // pass in the HTML from our dynamic component
        const popupContent = component.location.nativeElement;

        // add popup functionality
        marker.bindPopup(popupContent).openPopup();

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
