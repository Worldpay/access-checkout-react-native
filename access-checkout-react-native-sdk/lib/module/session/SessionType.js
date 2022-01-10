function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class SessionType {}

_defineProperty(SessionType, "CARD", 'CARD');

_defineProperty(SessionType, "CVC", 'CVC');
//# sourceMappingURL=SessionType.js.map