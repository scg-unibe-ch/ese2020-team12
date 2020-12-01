import { TestBed } from '@angular/core/testing';

import { ClonerServiceService } from './cloner-service.service';

describe('ClonerServiceService', () => {
  let service: ClonerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClonerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
