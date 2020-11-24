import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendproductPageComponent } from './lendproduct-page.component';

describe('LendproductPageComponent', () => {
  let component: LendproductPageComponent;
  let fixture: ComponentFixture<LendproductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendproductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendproductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
