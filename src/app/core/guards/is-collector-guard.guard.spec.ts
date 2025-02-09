import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isCollectorGuardGuard } from './is-collector-guard.guard';

describe('isCollectorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isCollectorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
