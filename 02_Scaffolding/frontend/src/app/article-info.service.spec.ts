import { TestBed } from '@angular/core/testing';

import { ArticleInfoService } from './article-info.service';

describe('ArticleInfoService', () => {
  let service: ArticleInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
