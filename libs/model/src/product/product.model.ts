import { Injectable } from '@nestjs/common';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';

import { ProductsRepository } from './product.repository.local';
//import { ProductsRepository } from './product.repository.supabase';

import { CreateProductDto } from './product.dto.create';
import { FindProductDto } from './product.dto.find';
import { UpdateProductDto } from './product.dto.update';

export {
    ProductsRepository,
    CreateProductDto,
    FindProductDto,
    UpdateProductDto
};

@Injectable()
export class Product {
    //*******************************************************************/
    //* ATTRIBUTES
    @Expose({ groups: ['admin'] })
    public readonly id?: number;
    public sku?: string;
    public title?: string;
    public description?: string;
    public price?: number;
    @Expose({ groups: ['admin', 'audit'] })
    public createdAt?: Date;
    @Expose({ groups: ['admin', 'audit'] })
    public createdBy?: string;
    @Expose({ groups: ['admin', 'audit'] })
    public updatedAt?: Date;
    @Expose({ groups: ['admin', 'audit'] })
    public updatedBy?: string;

    //*******************************************************************/
    //* GENERIC MODEL
    @Exclude() // * Important * //
    serialize = (schemas?: string[] | string) =>
        instanceToPlain(
            this,
            schemas
                ? { groups: typeof schemas === 'string' ? [schemas] : schemas }
                : undefined
        );
    //*
    //*********************************************************************/
}
