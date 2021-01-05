import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Markers, Position } from './google-map.interface';
@Injectable({
    providedIn: 'root'
})
export class GoogleMapService {
    public markers: BehaviorSubject<Markers[]> = new BehaviorSubject<Markers[]>([]);
    public currentLocation: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);
    constructor() { }


    updateMarkers(markers: any): void {
        if (!Array.isArray(markers)) {
            markers = [markers];
        }
        const currentLocation = this.currentLocation.getValue();
        const updatedMarkers = [currentLocation, ...markers].map(marker => ({ position: marker }));
        this.markers.next(updatedMarkers);
    }

}
