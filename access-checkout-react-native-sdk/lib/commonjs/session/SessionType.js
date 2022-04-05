"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CVC = exports.CARD = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SessionType {}

exports.default = SessionType;

_defineProperty(SessionType, "CARD", 'CARD');

_defineProperty(SessionType, "CVC", 'CVC');

const CARD = SessionType.CARD;
exports.CARD = CARD;
const CVC = SessionType.CVC;
exports.CVC = CVC;
//# sourceMappingURL=SessionType.js.map