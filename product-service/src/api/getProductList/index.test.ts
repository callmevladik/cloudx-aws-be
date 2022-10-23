import { getProductList } from '~/api/getProductList/index';
import { productsMock } from '~/mocks/products/index.mock';

describe('getProductList', () => {
    it('should return a list of products', async () => {
        const products = await getProductList();

        expect(products).toHaveLength(productsMock.length);
    });
});
