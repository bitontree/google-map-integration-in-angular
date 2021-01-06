export interface Markers {
    position: Position;
    location?: string;
}

export interface Wizard {
    destinations?: Destination[];
}

export interface Destination {
    name: string;
    position: Position;
    title: string;
}

export interface Position {
    lat: number;
    lng: number;
}

export interface SelectedPlaces {
    id: number;
    data: Destination;
}
