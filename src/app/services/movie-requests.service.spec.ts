import { TestBed } from '@angular/core/testing';

import { MovieRequestsService } from './movie-requests.service';

describe('MovieRequestsService', () => {
  let service: MovieRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
