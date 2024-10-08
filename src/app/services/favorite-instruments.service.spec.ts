import { TestBed } from '@angular/core/testing';

import { FavoriteInstrumentsService } from './favorite-instruments.service';

describe('FavoriteInstrumentsService', () => {
  let service: FavoriteInstrumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteInstrumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
