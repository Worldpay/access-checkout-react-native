// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BrandImage from '../../src/validation/BrandImage';

describe('BrandImage', () => {
  it('is made of a type and a url', () => {
    const image: BrandImage = {
      type: 'some type',
      url: 'some url',
    };

    expect(image.type).toEqual('some type');
    expect(image.url).toEqual('some url');
  });
});
