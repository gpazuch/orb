import { TestBed } from '@angular/core/testing';

import { Orb.PageService } from './orb.page.service';

describe('Orb.PageService', () => {
  let service: Orb.PageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orb.PageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
