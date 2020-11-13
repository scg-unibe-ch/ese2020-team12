import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenLawnComponent } from './garden-lawn.component';

describe('GardenLawnComponent', () => {
  let component: GardenLawnComponent;
  let fixture: ComponentFixture<GardenLawnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenLawnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenLawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
