import {
    ProductsRepository,
    CreateProductDto,
    UpdateProductDto
} from '@model/product/product.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}
    create(createProductDto: CreateProductDto) {
        return this.productsRepository.create(createProductDto);
    }

    findAll(schema?: string) {
        console.log('microservice controller findAll()');
        return this.productsRepository.findAll(schema);
    }

    findOne(id: number) {
        return this.productsRepository.findOne(id);
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return this.productsRepository.update(id, updateProductDto);
    }

    remove(id: number) {
        return this.productsRepository.remove(id);
    }
}
