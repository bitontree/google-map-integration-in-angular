import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GoogleMapService } from '../google-map/google-map.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WizardService } from '../wizard.service';
@Component({
  selector: 'app-multiple-destination',
  templateUrl: './multiple-destination.component.html',
  styleUrls: ['./multiple-destination.component.scss']
})
export class MultipleDestinationComponent implements OnInit, OnDestroy {
  key = 'destinations';
  destinations = [null];
  wizardData: any;
  constructor(private _googleMapService: GoogleMapService,
    private _wizardService: WizardService
  ) { }

  ngOnInit(): void {
    this._wizardService.wizardData.subscribe(data => {
      this.wizardData = data;
      if (this.wizardData[this.key]) {
        this.destinations = this.wizardData[this.key];
      }
    });
  }

  ngOnDestroy(): void {
    this.destinations = this.destinations.filter(destination => destination);
  }

  getDestinations({ id, data }) {
    this.destinations[id] = data;
    this.updateMarker();
  }
  addDestination() {
    this.destinations.push(null);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.destinations, event.previousIndex, event.currentIndex);
    this.updateMarker()
  }

  updateMarker() {
    const markers = this.destinations.map(destination => {
      const lng = destination.position.lng;
      const lat = destination.position.lat;
      return { lat, lng };
    })
    this.destinations = this.destinations.filter(destination => destination);
    this._wizardService.updateWizardData(this.wizardData, this.key, this.destinations);
    this._googleMapService.updateMarkers(markers);
  }
  deletePlace(index) {
    this.destinations.splice(index, 1);
    this.updateMarker();
    if (this.destinations.length === 0)
      this.destinations = [null];
  }
  displayAddButton() {               // function to show add destination button only when there is atleast one location entered
    const destination = this.destinations.filter(destination => destination);
    if (destination && destination.length > 0)
      return false
    else return true
  }
}
