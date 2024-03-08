import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './service-products.controller';
import { ProductsService } from './service-products.service';

describe('ProductsController', () => {
    let productsController: ProductsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService]
        }).compile();

        productsController = app.get<ProductsController>(productsController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(productsController.create).toBeDefined();
        });
    });
});
