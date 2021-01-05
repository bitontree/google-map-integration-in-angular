import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { GoogleMapService } from '../../google-map/google-map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Wizard, Markers } from '../../google-map/google-map.interface';
@Component({
  selector: 'app-places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss']
})
export class PlacesAutocompleteComponent implements AfterViewInit, OnInit {
  markers = [];
  @Input() place;
  @Input() id;
  @Output() selectedPlaces = new EventEmitter<any>();
  @Output() deletePlace = new EventEmitter<any>();
  @ViewChild('pacel') inputEl: ElementRef;
  wizardData: Wizard;
  constructor(
    private googleMapService: GoogleMapService,
    private wizardService: WizardService,
    private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.wizardService.wizardData.subscribe(data => {
      this.wizardData = data;
    });
  }

  ngAfterViewInit(): void {
    this.googleMapService.markers.subscribe((markers: Markers[]) => {
      this.markers = markers;
    });
    this.initMap();
  }

  initMap(): void {
    const options = {
      types: ['(cities)'],
    };
    const autocomplete = new google.maps.places.Autocomplete(
      this.inputEl.nativeElement as HTMLInputElement,
      options
    ); // Set the data fields to return when the user selects a place.
    const geocoder = new google.maps.Geocoder();
    if (this.place) {
      autocomplete.setValues(this.place);
      this.inputEl.nativeElement.value = this.place.title;
    }
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const lng = place.geometry.location.lng();
      const lat = place.geometry.location.lat();
      const title = place.address_components.reduce((name, currentValue) => {
        if (name === '') { return currentValue.long_name; }
        if (!name.includes(currentValue.long_name)) { return name + ', ' + currentValue.long_name; }
        return name;
      }, '');
      const data = {
        name: place.name,
        title,
        position: {
          lat,
          lng
        }
      };
      this.addMarker(lat, lng);
      this.selectedPlaces.emit({ id: this.id, data });
      if (!place.geometry) {
        window.alert('No details available for input: \'' + place.name + '\'');
        return;
      }
    });
  }
  addMarker(lat, lng): void {
    this.markers.push({
      position: {
        lat,
        lng,
      },
    });
    this.googleMapService.markers.next(this.markers);
  }
  deleteInput(): void {                    // Emits an output to parent component(MultipleDestinationsComponent)
    this.deletePlace.emit(this.id);  // with index of deleted destinaion element from the array
  }

  displayRemoveIcon(): boolean {                        // To display remove destination icon ( x ) only when
    if (this.wizardData.destinations) {     // there are more than one destinations
      if (this.wizardData.destinations.length >= 1) {
        return true;
      } else {
        return false;
      }
    }
  }
}
