import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProductsController } from './service-products.controller';
import { ServiceProductsService } from './service-products.service';

describe('ServiceProductsController', () => {
    let serviceProductsController: ServiceProductsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ServiceProductsController],
            providers: [ServiceProductsService]
        }).compile();

        serviceProductsController = app.get<ServiceProductsController>(
            ServiceProductsController
        );
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(serviceProductsController.getHello()).toBe('Hello World!');
        });
    });
});
