import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GoogleMapService } from '../google-map/google-map.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WizardService } from '../wizard.service';
import { Wizard } from '../google-map/google-map.interface';
@Component({
  selector: 'app-multiple-destination',
  templateUrl: './multiple-destination.component.html',
  styleUrls: ['./multiple-destination.component.scss']
})
export class MultipleDestinationComponent implements OnInit, OnDestroy {
  key = 'destinations';
  destinations = [null];
  wizardData: Wizard;
  constructor(
    private googleMapService: GoogleMapService,
    private wizardService: WizardService
  ) { }

  ngOnInit(): void {
    this.wizardService.wizardData.subscribe(data => {     // Subscribed to wizardData behaviour subject and assigning
      this.wizardData = data;                              // the object to component variable wizardData
      if (this.wizardData[this.key]) {
        this.destinations = this.wizardData[this.key];
      }
    });
  }

  ngOnDestroy(): void {
    this.destinations = this.destinations.filter(destination => destination);
  }

  getDestinations({ id, data }): void {       // Updating the destination & marker according to each IDs getting
    this.destinations[id] = data;       // from child component (PlacesAutocomplete)
    this.updateMarker();
  }
  addDestination(): void {                    // To add a new destination
    this.destinations.push(null);
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.destinations, event.previousIndex, event.currentIndex);
    this.updateMarker();
  }

  updateMarker(): void {                    // To update the markers on google map with addition & deletion of destinations
    const markers = this.destinations.map(destination => {
      const lng = destination.position.lng;
      const lat = destination.position.lat;
      return { lat, lng };
    });
    this.destinations = this.destinations.filter(destination => destination);
    this.wizardService.updateWizardData(this.wizardData, this.key, this.destinations);
    this.googleMapService.updateMarkers(markers);
  }
  deletePlace(index): void {                     // Delete a destination according to ID getting from
    this.destinations.splice(index, 1);    // child component(PlacesAutocomplete)
    this.updateMarker();
    if (this.destinations.length === 0) {
      this.destinations = [null];
    }
  }
  displayAddButton(): boolean {           // Function to show add destination button only when there is atleast one location entered
    const destination = this.destinations.filter((dest: Wizard) => dest);
    if (destination && destination.length > 0) {
      return false;
    }
    else { return true; }
  }
}
