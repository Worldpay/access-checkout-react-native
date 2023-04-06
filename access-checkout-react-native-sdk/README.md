# Access Checkout React Native SDK

![](./worldpay_logo.png)

This SDK is the first step for integrating the Worldpay Access Payment APIs into a React Native app.
It is designed to simplify the integration of the following functionality:
- validating the format of the card details entered by a shopper 
- generating a session (short-lived token representing a shopper's card details)  

## Documentation

The detailed documentation explaining how to integrate the SDK and how to use a session to take a payment can be found in Access Worldpay documentation at [https://developer.worldpay.com](https://developer.worldpay.com)

## Compatibility

The SDK is compatible with all react native versions starting from version 0.59

## Features

The SDK offers you the following features

### For card payments

#### Card session

Creates a session which you need to use to take a payment using the Access Worldpay APIs.

#### Cvc session (optional)

Creates a cvc which you may want to use for additional security as part of taking a payment using the Access Worldpay APIs.

#### Card details validation

Validates the format of the card details entered by a shopper to ensure that the card number, expiry date and cvc have been entered correctly by a shopper prior to submitting them. The card number is validated using the Luhn algorithm.

#### Card brand detection

Allows you to listen to events indicating which card brand corresponds to the card number entered by a shopper. The following major card brands are supported:
- American Express
- Diners
- Discover
- JCB
- Maestro
- Mastercard
- Visa

#### Card number formatting (optional) 

Formats a card number as the shopper types to make it easier to enter and read a card number.

#### Card brands restriction (optional)

Changes the behaviour of the validation feature to consider as valid only the card brands that you want to support.


### For cvc only payments

Paying with a Cvc only is possible with the Access Worldpay APIs using a Verified Token. Verified tokens are long-lived tokens representing a shopper's card details valid for more than a year which you would have typically saved in your database as part of a first card payment.

#### Cvc validation

Validates the format of the Cvc entered by a shopper to ensure it appears valid prior to submitting it.

so that Description of what RN SDK is and what it is used for
Prerequisites
Features of RN SDK - card brand restrictions, PAN formatting, hook to initialise validation, compatibility with versions

## Hooks

#### useCardValidation()

Use this hook to get a function used to initialise the validation of your card payment form.

#### useCvcOnlyValidation()

Use this hook to get a function used to initialise the validation of your cvc only payment form.


## Full code samples

- [Creating a session to pay with a card](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/card-only#full-code-sample)
- [Validating the card details entered by a shopper](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/card-validator#full-code-sample)
- [Validating the cvc entered by a shopper](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/cvc-validator#full-code-sample)
