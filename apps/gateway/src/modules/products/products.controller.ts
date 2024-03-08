import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject
    // UseGuards
    // UseInterceptors
} from '@nestjs/common';
import { CreateProductDto } from '@model/product/product.dto.create';
import { UpdateProductDto } from '@model/product/product.dto.update';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
// import { User } from '@model/user/user.model';
// import { AuthUser } from 'lib/core/src/auth/decorators/user.decorator';
// import { isPublic } from 'lib/core/src/auth/decorators/isPublic.decorator';
// import { Rol } from 'lib/core/src/auth/decorators/rol.decorator';
// import { JwtAuthGuard } from 'lib/core/src/auth/guards/jwt.guard';
// import { RolesGuard } from '@lib/core/src/auth/guards/roles.guard';
// import { SchemaFromRol } from '@lib/core/interceptors/ClassSerializerSchema.decorators';
// import { ClassSerializerSchemaInterceptor } from '@lib/core/interceptors/ClassSerializerSchema';

const invokeService = async (
    clientProxy: ClientProxy,
    pattern: any,
    data: any = {},
    defaultValue = undefined,
    setTimeout = 5000
) =>
    await firstValueFrom(
        clientProxy.send(pattern, data).pipe(timeout(setTimeout)),
        {
            defaultValue
        }
    );

@Controller('products')
// @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
// @UseInterceptors(ClassSerializerSchemaInterceptor)
export class ProductsController {
    constructor(
        @Inject('SERVICE_PRODUCTS')
        private readonly serviceProducts: ClientProxy
    ) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return invokeService(
            this.serviceProducts,
            'Product.create',
            createProductDto
        );
    }

    @Get()
    //@isPublic()
    findAll() {
        console.log('gateway controller findAll()');
        return invokeService(this.serviceProducts, 'Product.findAll');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return invokeService(this.serviceProducts, 'Product.findOne', id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return invokeService(this.serviceProducts, 'Product.update', {
            id,
            updateProductDto
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return invokeService(this.serviceProducts, 'Product.remove', id);
    }
}
