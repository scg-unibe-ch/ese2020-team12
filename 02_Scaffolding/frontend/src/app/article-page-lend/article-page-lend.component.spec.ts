import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePageLendComponent } from './article-page-lend.component';

describe('ArticlePageLendComponent', () => {
  let component: ArticlePageLendComponent;
  let fixture: ComponentFixture<ArticlePageLendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePageLendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageLendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
