import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PointsEffects } from './points.effects';

describe('PointsEffects', () => {
  let actions$!: Observable<any>;
  let effects: PointsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PointsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PointsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
