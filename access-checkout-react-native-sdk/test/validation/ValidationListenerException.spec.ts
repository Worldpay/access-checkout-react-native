import { ValidationListenerException } from '../../src/validation/ValidationListenerException';

describe('ValidationListenerException', () => {
  it('by default it should construct error with name and message', () => {
    const error = new ValidationListenerException();
    expect(error.name).toEqual('ValidationListenerError');
    expect(error.message).toEqual(
      `Validation listener was undefined. When using validation methods such as 'initialiseValidation' a validation listener needs to be provided.`
    );
  });
});
