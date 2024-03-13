import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [
        {
            provide: 'SERVICE_PRODUCTS',
            useFactory: (configService: ConfigService) => {
                const HOST =
                    configService.get('SERVICE_PRODUCTS_HOST') || '127.0.0.1';
                const PORT = configService.get('SERVICE_PRODUCTS_PORT') || 3001;
                return ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: HOST,
                        port: PORT
                    }
                });
            },
            inject: [ConfigService]
        }
    ]
})
export class ProductsModule {}
