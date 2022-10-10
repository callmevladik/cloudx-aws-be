import { getProductById } from '~/api/getProductById/index';

describe('getProductById', () => {
    it('should return a product with expected id', async () => {
        const testProductId = 5;
        const product = await getProductById(testProductId);

        expect(product.id).toBe(testProductId);
    });

    it('should throw an error if something goes wrong', async () => {
        const testProductId = +'error-id';

        try {
            await getProductById(testProductId);
        } catch (error: any) {
            expect(error.statusCode).toBe(404);
            expect(error.errorMessage).toBe(
                "Error! Couldn't get product with id NaN",
            );
        }
    });
});
