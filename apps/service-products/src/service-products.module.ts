import { Module } from '@nestjs/common';
import { ServiceProductsController } from './service-products.controller';
import { ServiceProductsService } from './service-products.service';
import { ProductsRepository } from '@model/product/product.model';

@Module({
    imports: [],
    controllers: [ServiceProductsController],
    providers: [ServiceProductsService, ProductsRepository]
})
export class ServiceProductsModule {}
