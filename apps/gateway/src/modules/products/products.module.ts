import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'SERVICE_PRODUCTS',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 3001
                }
            }
        ])
    ],
    controllers: [ProductsController]
})
export class ProductsModule {}
