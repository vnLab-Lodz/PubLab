import reducer, {
    creationExecuting,
    creationFulfilled,
    creationRejected
} from './gatsbyGenerateProjectSlice';

describe('gatsbyGenerateProjectSlice', () => {
    it('handles creationExecuting action', () => {
      expect(reducer(undefined, creationExecuting())).toEqual({
        creating: true,
        creationSuccess: null,
      });
    });

    it('handles creationFulfilled action', () => {
      expect(reducer(undefined, creationFulfilled())).toEqual({
        creating: false,
        creationSuccess: true,
      });
    });

    it('handles creationRejected action', () => {
      expect(reducer(undefined, creationRejected())).toEqual({
        creating: false,
        creationSuccess: false,
      });
    });
});