// @ts-ignore
import Brand from '../../src/validation/Brand';
// @ts-ignore
import BrandImage from '../../src/validation/BrandImage';

describe('Brand', () => {
  it('is made of a name and an array of images', () => {
    const image1: BrandImage = {
      type: 'type1',
      url: 'url1',
    };
    const image2: BrandImage = {
      type: 'type2',
      url: 'url2',
    };

    const brand: Brand = {
      name: 'brand-name',
      images: [image1, image2],
    };

    expect(brand.name).toEqual('brand-name');

    expect(brand.images[0].type).toEqual('type1');
    expect(brand.images[0].url).toEqual('url1');

    expect(brand.images[1].type).toEqual('type2');
    expect(brand.images[1].url).toEqual('url2');
  });
});
