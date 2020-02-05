import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { AppComponent } from "./app.component";
import { SidebarModule } from "ng-sidebar";
import { MapComponent } from "./map/map.component";
import { FilterComponent } from "./filter/filter.component";
import { MeasurementsService } from "./services/measurements.service";
import { CountriesService } from "./services/countries.service";
import { SharedService } from "./services/shared.service";
import { CitiesService } from "./services/cities.service";
import { MapMarkerComponent } from "./map/map-marker/map-marker.component";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgProgressModule.withConfig({
      spinnerPosition: "right",
      color: "#ff6600",
      thick: true
    }),
    NgProgressHttpModule,
    LeafletModule.forRoot(),
    SidebarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MapComponent,
    FilterComponent,
    MapMarkerComponent
  ],
  providers: [MeasurementsService, CountriesService, SharedService, DatePipe, CitiesService,TitleCasePipe],
  // IMPORTANT! Dynamic components need to be registered here
  entryComponents: [MapMarkerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
