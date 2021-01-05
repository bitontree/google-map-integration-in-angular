import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDestinationComponent } from './multiple-destination.component';

describe('MultipleDestinationComponent', () => {
  let component: MultipleDestinationComponent;
  let fixture: ComponentFixture<MultipleDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
