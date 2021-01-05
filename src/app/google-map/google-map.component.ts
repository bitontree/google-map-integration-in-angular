import { Component, ViewChild, OnInit } from '@angular/core';
import { GoogleMapService } from './google-map.service';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    @ViewChild('mapel') googlemaps: google.maps.Map;
    icon = 'assets/images/blue-marker2.png';
    homeicon = 'assets/images/home-marker.png';
    center: any = null;
    zoom = 18;
    title = 'google-map';
    markers = [];
    polylineOptions = {
        path: [],
        strokeColor: '#32a1d0',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    };

    constructor(
        private _googleMapService: GoogleMapService) { }

    ngOnInit(): void {
        const markers = this._googleMapService.markers.getValue();    //getting markers array  
        if (Array.isArray(markers) && markers.length > 0) {
            this._googleMapService.markers.next(markers);
        } else {
            navigator.geolocation.getCurrentPosition((position) => {   //using geolocation getting the  
                let center = {                                         // current coordinates and passing into
                    lat: position.coords.latitude,                     // current location
                    lng: position.coords.longitude,
                };
                this._googleMapService.currentLocation.next(center);
                this.addMarker(position.coords.latitude, position.coords.longitude);
            });
        }
        // this._wizardService.wizardData.next(data);
    }

    ngAfterViewInit() {
        this._googleMapService.markers.subscribe((markers) => {
            if (!markers || (Array.isArray(markers) && markers.length === 0)) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            const path = [];
            this.markers = markers.map((marker, index) => {
                const { position, location } = marker;
                bounds.extend(new google.maps.LatLng(position));
                path.push(new google.maps.LatLng(position));
                return {
                    position,
                    label: {
                        color: 'white',
                        text: `${index}`,
                    },
                    options: {
                        icon: {
                            url: location ? this.homeicon : this.icon,
                            scaledSize: { height: 35, width: 25 },
                        },
                    },
                };
            });
            this.polylineOptions = { ...this.polylineOptions, path };
            this.googlemaps.fitBounds(bounds);
        });
        setTimeout(() => {
            this._googleMapService.currentLocation.subscribe(
                (center) => (this.center = center)
            );
        }, 100);
    }

    addMarker(lat, lng) {                     //pushing the marker we got from current location into array of markers 
        this.markers.push({
            location: 'home',
            position: {
                lat: lat,
                lng: lng,
            },
        });
        this._googleMapService.markers.next(this.markers);
    }
}
