"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationListenerException = void 0;
class ValidationListenerException extends Error {
  constructor() {
    super();
    this.name = 'ValidationListenerError';
    this.message = `Validation listener was undefined. When using validation methods such as 'initialiseValidation' a validation listener needs to be provided.`;
  }
}
exports.ValidationListenerException = ValidationListenerException;
//# sourceMappingURL=ValidationListenerException.js.map