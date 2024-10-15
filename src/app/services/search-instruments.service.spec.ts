import { TestBed } from '@angular/core/testing';

import { SearchInstrumentsService } from './search-instruments.service';

describe('SearchInstrumentsService', () => {
  let service: SearchInstrumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInstrumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
