import { TestBed } from '@angular/core/testing';

import { SinkService } from './sink.service';

describe('SinkService', () => {
  let service: SinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
