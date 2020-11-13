import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesShoesComponent } from './clothes-shoes.component';

describe('ClothesShoesComponent', () => {
  let component: ClothesShoesComponent;
  let fixture: ComponentFixture<ClothesShoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothesShoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
