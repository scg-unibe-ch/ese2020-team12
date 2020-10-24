import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendProductComponent } from './lend-product.component';

describe('LendProductComponent', () => {
  let component: LendProductComponent;
  let fixture: ComponentFixture<LendProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
