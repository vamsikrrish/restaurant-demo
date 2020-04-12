import { TestBed } from '@angular/core/testing';

import { RestaurentService } from './restaurent.service';

describe('RestaurentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurentService = TestBed.get(RestaurentService);
    expect(service).toBeTruthy();
  });
});
