import { getAvailableProductList } from '~/api/getAvailableProductList/index';
import { productsMock } from '~/mocks/products/index.mock';

describe('getAvailableProductList', () => {
    it('should return a list of available products', async () => {
        const products = await getAvailableProductList();
        const availableProductsNumber = productsMock.filter(
            ({ count }) => count > 0,
        ).length;

        expect(products).toHaveLength(availableProductsNumber);
    });
});
