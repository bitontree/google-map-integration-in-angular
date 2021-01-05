import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wizard } from './google-map/google-map.interface';
@Injectable({
  providedIn: 'root'
})
export class WizardService {
  public wizardData: BehaviorSubject<Wizard> = new BehaviorSubject<Wizard>({});
  constructor() { }

  updateWizardData(wizardData, key, data): void {
    let updatedData = {};
    wizardData[key] = data;
    updatedData = wizardData;
    this.wizardData.next(updatedData);
  }
}
