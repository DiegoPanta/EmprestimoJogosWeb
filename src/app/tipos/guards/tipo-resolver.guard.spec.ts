import { TestBed } from '@angular/core/testing';

import { TipoResolverGuard } from './tipo-resolver.guard';

describe('TipoResolverGuard', () => {
  let guard: TipoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TipoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
