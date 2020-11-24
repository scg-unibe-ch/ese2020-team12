import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePageServiceComponent } from './article-page-service.component';

describe('ArticlePageServiceComponent', () => {
  let component: ArticlePageServiceComponent;
  let fixture: ComponentFixture<ArticlePageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
