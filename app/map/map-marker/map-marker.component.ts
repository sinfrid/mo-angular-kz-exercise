import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-map-marker",
  templateUrl: "./map-marker.component.html",
  styleUrls: ["./map-marker.component.css"]
})
export class MapMarkerComponent {
  @Input() data;
}
