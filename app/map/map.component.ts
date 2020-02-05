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

// Main map component using LeafletJS
export class MapComponent implements OnInit {
  map;
  mapbounds = [];
  markers: MarkerMetaData[] = [];
  options = {
    layers: [tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")],
    zoom: 5,
    maxZoom: 9,
    minZoom: 3,
    zoomControl: false,
    center: [51.505, -0.09]
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

  // When map is finished loading
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
    this.addMapMarkers("FR"); // Default Country = France
  }

  // Refresh map status
  public refreshMap(event, city?) {
    this.removeMapMarkers();
    this.addMapMarkers(event.code, city);
  }
  // Add markers based on country
  addMapMarkers(country, city?) {
    if (city) {
      this.measurementsService
        .getMeasurementByCity(city.name)
        .subscribe((res: any) => {
          this.mapbounds = [];
          for (const c of res) {
            this.formatMarker(c);
          }
          // Set map view to the markers filtered
          this.map.fitBounds(this.mapbounds);
        });
    } else {
      this.measurementsService.getMeasurement(country).subscribe((res: any) => {
        this.mapbounds = [];
        for (const c of res) {
          this.formatMarker(c);
        }
        // Set map view to the markers filtered
        this.map.fitBounds(this.mapbounds);
      });
    }
  }

  // Remove all map markers
  removeMapMarkers() {
    for (const c of this.markers) {
      this.map.removeLayer(c.markerInstance);
    }
  }

  // Format the map marker
  formatMarker(c) {
    // dynamically instantiate a HTMLMarkerComponent
    const factory = this.resolver.resolveComponentFactory(MapMarkerComponent);

    // we need to pass in the dependency injector
    const component = factory.create(this.injector);

    // Match data
    component.instance.data = c;

    // we need to manually trigger change detection on our in-memory component
    component.changeDetectorRef.detectChanges();

    // Match coordinates
    const lat = c.coordinates["latitude"];
    const lon = c.coordinates["longitude"];

    // Create Marker
    const marker = L.marker([lat, lon]);

    // pass in the HTML from our dynamic component
    const popupContent = component.location.nativeElement;

    // add popup functionality
    marker.bindPopup(popupContent).openPopup();

    // Add to map
    marker.addTo(this.map);

    // Add to markers list for keep track later
    this.markers.push({
      name: c.city,
      markerInstance: marker
    });

    // Create bounds limits
    this.mapbounds.push([lat, lon]);
  }
}
