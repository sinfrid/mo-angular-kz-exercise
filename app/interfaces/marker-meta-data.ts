
import { tileLayer, latLng, marker, Marker } from "leaflet";

// Marker meta data Interface
export interface MarkerMetaData {
    name: String;
    markerInstance: Marker;
}