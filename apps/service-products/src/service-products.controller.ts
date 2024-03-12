import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './service-products.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import {
    CreateProductDto,
    UpdateProductDto
} from '@model/product/product.model';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    default() {
        return 'Echo service';
    }
    @EventPattern('user_created')
    async handleUserCreated(data: Record<string, unknown>) {
        console.log('user_created!', data);
    }
    @MessagePattern('Product.create')
    create(createProductDto: CreateProductDto) {
        console.log(`createProductDto`, createProductDto);
        return this.productsService.create(createProductDto);
    }

    @MessagePattern('Product.findAll')
    async findAll(schema?: string) {
        return this.productsService.findAll(schema);
    }

    @MessagePattern('Product.findOne')
    findOne(id: any) {
        return this.productsService.findOne(+id);
    }

    @MessagePattern('Product.update')
    update(id: string, updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }
    @MessagePattern('Product.remove')
    remove(id: string) {
        return this.productsService.remove(+id);
    }
}
