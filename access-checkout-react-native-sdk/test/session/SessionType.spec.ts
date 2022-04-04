import SessionType, { CARD, CVC } from '../../src/session/SessionType';

describe('SessionType', () => {
  it('can be used by merchant to specify a Card session type', () => {
    expect(SessionType.CARD).toEqual('CARD');
  });

  it('can be used by merchant to specify a Cvc session type', () => {
    expect(SessionType.CVC).toEqual('CVC');
  });

  it('exports a CARD constant', () => {
    expect(CARD).toEqual('CARD');
  });

  it('exports a CVC constant', () => {
    expect(CVC).toEqual('CVC');
  });
});
