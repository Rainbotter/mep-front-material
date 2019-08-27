import { TestBed } from '@angular/core/testing';

import { MepService } from './mep.service';

describe('MepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MepService = TestBed.get(MepService);
    expect(service).toBeTruthy();
  });
});
