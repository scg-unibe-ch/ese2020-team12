import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdGardenComponent } from './household-garden.component';

describe('HouseholdGardenComponent', () => {
  let component: HouseholdGardenComponent;
  let fixture: ComponentFixture<HouseholdGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdGardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
