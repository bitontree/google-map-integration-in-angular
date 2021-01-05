import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { GoogleMapService } from '../../google-map/google-map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss']
})
export class PlacesAutocompleteComponent implements AfterViewInit, OnInit {
  markers = [];
  @Input() place;
  @Input() id;
  @Input() key;
  @Output() selectedPlaces = new EventEmitter<any>();
  @Output() deletePlace = new EventEmitter<any>();
  @ViewChild('pacel') inputEl: ElementRef;
  wizardData: any;
  homeLatLng: any;
  constructor(private _googleMapService: GoogleMapService, private _wizardService: WizardService, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this._wizardService.wizardData.subscribe(data => {
      this.wizardData = data;
      if (this.wizardData[this.key]) {
        this.place = this.wizardData[this.key];
      }
    });
  }

  ngAfterViewInit(): void {
    this._googleMapService.markers.subscribe((markers: any) => {
      this.markers = markers
    });
    this.initMap();
  }

  initMap(): void {
    const options = {
      types: ['(cities)'],
    };
    const autocomplete = new google.maps.places.Autocomplete(
      <HTMLInputElement>this.inputEl.nativeElement,
      options
    ); // Set the data fields to return when the user selects a place.
    const geocoder = new google.maps.Geocoder();
    if (this.key) {
      if (!this.markers[this.markers.length - 1].location) {
        this.homeLatLng = this._googleMapService.currentLocation.getValue();
        this.addMarker(this.homeLatLng.lat, this.homeLatLng.lng);
        const geocoder = new google.maps.Geocoder();
        this.geocodeLatLng(geocoder);
      }
    }
    if (this.place) {
      autocomplete.setValues(this.place);
      this.inputEl.nativeElement.value = this.place.title
    }
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const lng = place.geometry.location.lng();
      const lat = place.geometry.location.lat();
      const title = place.address_components.reduce((name, currentValue) => {
        if (name == '') return currentValue.long_name
        if (!name.includes(currentValue.long_name)) return name + ', ' + currentValue.long_name;
        return name
      }, "")
      let data = {
        name: place.name,
        title: title,
        position: {
          lat: lat,
          lng: lng
        }
      }
      this.addMarker(lat, lng);
      this.selectedPlaces.emit({ id: this.id, data });
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });
  }
  addMarker(lat, lng) {
    this.markers.push({
      position: {
        lat: lat,
        lng: lng,
      },
    });
    this._googleMapService.markers.next(this.markers);
  }
  deleteInput() {
    this.deletePlace.emit(this.id);
  }

  displayRemoveIcon() {
    if (this.wizardData['destinations']) {
      if (this.wizardData['destinations'].length >= 1) {
        return true
      } else {
        return false
      }
    }
  }
  geocodeLatLng(geocoder: google.maps.Geocoder) {
    const latlng = {
      lat: parseFloat(this.homeLatLng.lat),
      lng: parseFloat(this.homeLatLng.lng)
    }
    geocoder.geocode(
      { location: latlng },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === "OK") {
          if (results[0]) {
          } else {
            this._snackBar.open('No results found', 'close', {
              duration: 2000,
            });
          }
        } else {
          this._snackBar.open('Geocoder failed due to: ' + status, 'close', {
            duration: 2000,
          });
        }
      }
    );
  }
}
