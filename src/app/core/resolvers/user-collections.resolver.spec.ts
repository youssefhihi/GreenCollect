import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userCollectionsResolver } from './user-collections.resolver';

describe('userCollectionsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userCollectionsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
