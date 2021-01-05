import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapService } from './google-map/google-map.service';
import { RouterModule } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { WizardService } from './wizard.service';
import { MultipleDestinationComponent } from './multiple-destination/multiple-destination.component';
import { HttpClientModule } from '@angular/common/http';
import { PlacesAutocompleteComponent } from './multiple-destination/places-autocomplete/places-autocomplete.component';
import { MaterialModule } from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    MultipleDestinationComponent,
    PlacesAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDMLPt-tr9U9iJonMhC0DHCaDk9Pez6sz4'
    }),
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [GoogleMapService, WizardService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
