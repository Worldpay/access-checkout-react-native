"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccessCheckout = void 0;
var _index = require("../index");
var _useCardValidation = require("./useCardValidation");
var _useCvcOnlyValidation = require("./useCvcOnlyValidation");
const useAccessCheckout = ({
  baseUrl,
  checkoutId,
  config
}) => {
  const accessCheckout = new _index.AccessCheckout({
    baseUrl: baseUrl,
    merchantId: checkoutId
  });

  /**
   * Implementation note: Decided to use classes to benefit from instance checking.
   * If using interfaces or types a "type guard" could have been used. the trade off being having to check for
   * a specific property that would be unique to that interface/type which in theory it introduces another point of
   * failure if the property was to be renamed and not updated in the type guard.
   */
  if (config instanceof _index.CardConfig) {
    var _config$validationCon, _config$validationCon2, _config$validationCon3;
    const {
      initialiseCardValidation
    } = (0, _useCardValidation.useCardValidation)({
      accessCheckout,
      cardValidationConfig: {
        panId: config.panId,
        expiryDateId: config.expiryDateId,
        cvcId: config.cvcId,
        enablePanFormatting: (_config$validationCon = config.validationConfig) === null || _config$validationCon === void 0 ? void 0 : _config$validationCon.enablePanFormatting,
        acceptedCardBrands: (_config$validationCon2 = config.validationConfig) === null || _config$validationCon2 === void 0 ? void 0 : _config$validationCon2.acceptedCardBrands
      },
      validationListener: (_config$validationCon3 = config.validationConfig) === null || _config$validationCon3 === void 0 ? void 0 : _config$validationCon3.validationListener
    });
    const generateSessions = sessionTypes => accessCheckout.generateSessions({
      panId: config.panId,
      expiryDateId: config.expiryDateId,
      cvcId: config.cvcId
    }, sessionTypes);
    return {
      initialiseValidation: initialiseCardValidation,
      generateSessions
    };
  } else {
    var _config$validationCon4;
    const {
      initialiseCvcOnlyValidation
    } = (0, _useCvcOnlyValidation.useCvcOnlyValidation)({
      accessCheckout,
      cvcOnlyValidationConfig: {
        cvcId: config.cvcId
      },
      validationListener: (_config$validationCon4 = config.validationConfig) === null || _config$validationCon4 === void 0 ? void 0 : _config$validationCon4.validationListener
    });
    const generateCvcOnlySession = sessionTypes => accessCheckout.generateSessions({
      cvcId: config.cvcId
    }, sessionTypes);
    return {
      initialiseValidation: initialiseCvcOnlyValidation,
      generateSessions: generateCvcOnlySession
    };
  }
};
exports.useAccessCheckout = useAccessCheckout;
//# sourceMappingURL=useAccessCheckout.js.map