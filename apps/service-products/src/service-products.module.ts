import { Module } from '@nestjs/common';
import { ProductsController } from './service-products.controller';
import { ProductsService } from './service-products.service';
import { ProductsRepository } from '@model/product/product.model';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository]
})
export class ServiceProductsModule {}
