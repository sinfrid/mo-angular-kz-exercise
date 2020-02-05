import { Component, OnInit } from "@angular/core";
import { SharedService } from "./services/shared.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private _opened: boolean = false;

  constructor(private sharedService: SharedService) {
    this.sharedService._toggleSidebar = this._toggleSidebar.bind(this);
  }

  // Sidebar control
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
