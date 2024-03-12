import { Module } from '@nestjs/common';
import {
    ClientProxyFactory,
    ClientsModule,
    Transport
} from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ConfigService } from '@nestjs/config';

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
    providers: [
        {
            provide: 'SERVICE_PRODUCTS',
            useFactory: (configService: ConfigService) => {
                const HOST =
                    configService.get('SERVICE_PRODUCTS_HOST') || 'localhost';
                const PORT = configService.get('SERVICE_PRODUCTS_PORT') || 3002;
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
