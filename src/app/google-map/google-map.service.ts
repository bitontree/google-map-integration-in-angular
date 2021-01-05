import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapService {
    public markers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public currentLocation: BehaviorSubject<any> = new BehaviorSubject<any>(null);
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
