import { TestBed } from '@angular/core/testing';

import { SccaService } from './scca.service';

describe('SccaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SccaService = TestBed.get(SccaService);
    expect(service).toBeTruthy();
  });
});
