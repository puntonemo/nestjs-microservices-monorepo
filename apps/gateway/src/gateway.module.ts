import { Module } from '@nestjs/common';
import { ProductsController } from './modules/products/products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
    controllers: [ProductsController],
    providers: []
})
export class GatewayModule {}
