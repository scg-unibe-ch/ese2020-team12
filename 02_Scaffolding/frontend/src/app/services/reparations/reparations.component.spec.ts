import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationsComponent } from './reparations.component';

describe('ReparationsComponent', () => {
  let component: ReparationsComponent;
  let fixture: ComponentFixture<ReparationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
