export class Measurement {
  date: {
    utc: string;
    local: string;
  };
  parameter: string;
  value: string;
  unit: string;
  country: string;
  location: string;
  city: string;
  sourceName: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}
