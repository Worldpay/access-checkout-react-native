# Access Checkout React Native SDK

![](./worldpay_logo.png)

Create your own uniquely styled and branded checkout form by integrating our React Native SDK into your native app.

This SDK is the first step to integrate with our Access Worldpay APIs into a React Native app.
It is designed to simplify the integration of the following functionality in your checkout form:
- validating the format of the card details entered by a customer
- generating a session (short-lived token representing a customer's card details)

## Documentation

You can find the detailed documentation explaining how to integrate the SDK and use a session to take a payment starting with the [React Native section](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native) of the [Access Worldpay Checkout documentation](https://developer.worldpay.com).

## Compatibility

- `React Native` version `>= 0.70.0`
- `React` version `>= 18.1.0`
- `Cocoapods` only for iOS dependencies

## SAQ-A Compliance

To support SAQ-A compliance when using our React Native SDK, we have created a new component called AccessCheckoutTextInput:
It has been designed so that it does not expose any methods or properties to retrieve the text entered by the end user to ensure our merchants applications do not have direct access to card details and are SAQ-A compliant.

## AccessCheckoutTextInput

You can find detailed documentation about our new component [AccessCheckoutTextInput](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/optional-configuration) within the [React Native section](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native) of the [Access Worldpay Checkout documentation](https://developer.worldpay.com).

## How to install

Refer to [Get our SDK](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native#get-our-sdk) in the React Native section of the [Access Worldpay documentation](https://developer.worldpay.com)

## Features

The SDK offers you the following features:

### For card payments

#### Card session

Creates a session which you must use to take a payment using the Access Worldpay APIs.

#### CVC session (optional)

Creates a CVC session which you may want to use for additional security as part of taking a payment using the Access Worldpay APIs.

#### Card details validation

Validates the format of the card details to ensure that the card number, expiry date and CVC have been entered correctly by a customer prior to submitting them. The card number is validated using the Luhn algorithm.

#### Card brand detection

Allows you to listen to events indicating which card brand corresponds to the card number entered by a customer. The following major card brands are supported:
- American Express
- Diners
- Discover
- JCB
- Maestro
- Mastercard
- Visa

#### Card number formatting (optional) 

Formats a card number as the customer types to make it easier to enter and read a card number.

#### Card brands restriction (optional)

Changes the behavior of the validation feature to consider only the card brands that you want to support as valid.


### For CVC only payments

Paying only with CVC is possible with the Access Worldpay APIs using a Verified Token.
Verified tokens are long-lived tokens representing a customer's card details which are valid for 4 years. 
You would typically save these in your database as part of a first card payment in a repeat agreement.

#### CVC validation

Validates the format of the CVC entered by a customer to ensure it appears valid prior to submitting it.

## Hooks

#### useCardValidation()

Use this hook to get a function used to initialize the validation of your card payment form.

#### useCvcOnlyValidation()

Use this hook to get a function used to initialize the validation of your CVC only payment form.


## Full code samples

- [Creating a session to pay with a card](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/card-only#full-code-sample)
- [Validating the card details entered by a shopper](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/card-validator#full-code-sample)
- [Validating the cvc entered by a shopper](https://developer.worldpay.com/docs/access-worldpay/checkout/react-native/cvc-validator#full-code-sample)
