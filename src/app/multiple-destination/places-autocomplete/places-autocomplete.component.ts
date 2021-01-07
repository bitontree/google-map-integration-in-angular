import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { GoogleMapService } from '../../google-map/google-map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Wizard, Markers, SelectedPlaces } from '../../google-map/google-map.interface';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss']
})
export class PlacesAutocompleteComponent implements AfterViewInit, OnInit {
  markers = [];
  @Input() place;
  @Input() id;
  @Output() selectedPlaces = new EventEmitter<SelectedPlaces>();
  @Output() deletePlace = new EventEmitter<number>();
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  wizardData: Wizard;
  options = {
    types: ['(cities)']
  };
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

  public handleAddressChange(address: Address): void {
    const lng = address.geometry.location.lng();
    const lat = address.geometry.location.lat();
    const data = {
      name: address.name,
      title: address.formatted_address,
      position: {
        lat,
        lng
      }
    };
    this.addMarker(lat, lng);
    this.selectedPlaces.emit({ id: this.id, data });
  }
}
