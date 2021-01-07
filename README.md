# GoogleMap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## API Key

To make Google Map working place your Google API Key inplace of '**YOUR_API_KEY**' in 'index.html' .

## Dependencies used 

For Google maps
npm i @angular/google-maps  
npm i  @types/googlemaps

For autocomplete of search-input
npm i ngx-google-places-autocomplete

For material module
npm i @angular/material

## App folder structure


├── src

│   ├── app

│   │   ├── google-map 

│   │   │   ├── google-map.component.ts
│   │   │   ├── google-map.component.html
│   │   │   ├── google-map.component.scss
│   │   │   ├── google-map.service.ts
│   │   │   ├── google-map.interface.ts

│   │   ├── multiple-destination

│   │   │   ├── places-autocomplete 

│   │   │   │   ├── places-autocomplete.component.ts
│   │   │   │   ├── places-autocomplete.component.html
│   │   │   │   ├── places-autocomplete.component.scss

│   │   │   ├── multiple-destination.component.ts
│   │   │   ├── multiple-destination.component.html
│   │   │   ├── multiple-destination.component.scss

│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.module.ts
│   │   ├── material.module.ts
│   │   ├── wizard.service.ts

