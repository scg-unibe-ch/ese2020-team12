import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellservicePageComponent } from './sellservice-page.component';

describe('SellservicePageComponent', () => {
  let component: SellservicePageComponent;
  let fixture: ComponentFixture<SellservicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellservicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellservicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
