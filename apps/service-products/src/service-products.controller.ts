import { Controller } from '@nestjs/common';
import { ServiceProductsService } from './service-products.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import {
    CreateProductDto,
    UpdateProductDto
} from '@model/product/product.model';

@Controller()
export class ServiceProductsController {
    constructor(
        private readonly serviceProductsService: ServiceProductsService
    ) {}

    @EventPattern('user_created')
    async handleUserCreated(data: Record<string, unknown>) {
        console.log('user_created!', data);
    }
    @MessagePattern('product.create')
    create(createProductDto: CreateProductDto) {
        return this.serviceProductsService.create(createProductDto);
    }

    @MessagePattern('product.findAll')
    findAll(schema?: string) {
        return this.serviceProductsService.findAll(schema);
    }

    @MessagePattern('product.findOne')
    findOne(id: string) {
        return this.serviceProductsService.findOne(+id);
    }

    @MessagePattern('product.update')
    update(id: string, updateProductDto: UpdateProductDto) {
        return this.serviceProductsService.update(+id, updateProductDto);
    }
    @MessagePattern('product.remove')
    remove(id: string) {
        return this.serviceProductsService.remove(+id);
    }
}
