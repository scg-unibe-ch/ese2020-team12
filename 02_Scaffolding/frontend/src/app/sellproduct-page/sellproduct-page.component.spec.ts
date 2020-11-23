import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellproductPageComponent } from './sellproduct-page.component';

describe('SellproductPageComponent', () => {
  let component: SellproductPageComponent;
  let fixture: ComponentFixture<SellproductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellproductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellproductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
