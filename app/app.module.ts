import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HTMLMarkerComponent } from './html-marker.component';

import { DataService } from './data.service';
import { MapComponent } from './map/map.component';
import { FilterComponent } from './filter/filter.component';
import { MeasurementsService } from './services/measurements.service';
import { CountriesService } from './services/countries.service';
import { SharedService } from './services/shared.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule,NgSelectModule,HttpClientModule, LeafletModule.forRoot() ],
  declarations: [ AppComponent, HTMLMarkerComponent, MapComponent, FilterComponent ],
  providers: [ DataService, MeasurementsService, CountriesService, SharedService ],
  // IMPORTANT! Dynamic components need to be registered here
  entryComponents: [HTMLMarkerComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
