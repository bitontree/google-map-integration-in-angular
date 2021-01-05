import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WizardService {
  public wizardData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() { }

  updateWizardData(wizardData, key, data): void {
    let updatedData = {};
    wizardData[key] = data;
    updatedData = wizardData;
    this.wizardData.next(updatedData);
  }
}
