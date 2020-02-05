import { Injectable } from "@angular/core";

// Service to connect between components
@Injectable()
export class SharedService {
  refreshMap: Function;
  _toggleSidebar: Function;
  constructor() {}
}
