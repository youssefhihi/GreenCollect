import { initialState, pointsReducer } from "./points.reducer";

describe('Points Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = pointsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
