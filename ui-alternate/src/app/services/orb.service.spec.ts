import { TestBed } from '@angular/core/testing';

import { OrbService } from './orb.service';

describe('OrbService', () => {
  let service: OrbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
