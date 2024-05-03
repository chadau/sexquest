import { TestBed } from '@angular/core/testing';

import { SextoyService } from './sextoy.service';

describe('SextoyService', () => {
  let service: SextoyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SextoyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
