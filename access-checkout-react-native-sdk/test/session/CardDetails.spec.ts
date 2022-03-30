import type CardDetails from '../../src/session/CardDetails';

describe('CardDetails', () => {
  it('can be instantiated by a merchant with a pan, an expiry date and a cvv', () => {
    const cardDetails: CardDetails = {
      pan: '4444',
      expiryDate: '12/21',
      cvc: '123',
    };

    expect(cardDetails.pan).toEqual('4444');
    expect(cardDetails.expiryDate).toEqual('12/21');
    expect(cardDetails.cvc).toEqual('123');
  });

  it('can be instantiated by a merchant with just a cvv', () => {
    const cardDetails: CardDetails = {
      cvc: '123',
    };

    expect(cardDetails.cvc).toEqual('123');
  });
});
