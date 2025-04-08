"use strict";

export class ValidationListenerException extends Error {
  constructor() {
    super();
    this.name = 'ValidationListenerError';
    this.message = `Validation listener was undefined. When using validation methods such as 'initialiseValidation' a validation listener needs to be provided.`;
  }
}
//# sourceMappingURL=ValidationListenerException.js.map