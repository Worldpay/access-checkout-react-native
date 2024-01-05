import type SessionGenerationConfig from '../../src/session/SessionGenerationConfig';

describe('SessionGenerationConfig', () => {
  it('can be instantiated by a merchant with a pan, an expiry date and a cvv', () => {
    const cardDetails: SessionGenerationConfig = {
      panId: 'some-pan-id',
      expiryDateId: 'some-expiry-id',
      cvcId: 'some-cvc-id',
    };

    expect(cardDetails.panId).toEqual('some-pan-id');
    expect(cardDetails.expiryDateId).toEqual('some-expiry-id');
    expect(cardDetails.cvcId).toEqual('some-cvc-id');
  });

  it('can be instantiated by a merchant with just a cvv', () => {
    const cardDetails: SessionGenerationConfig = {
      cvcId: 'some-cvc-id',
    };

    expect(cardDetails.cvcId).toEqual('some-cvc-id');
  });
});
