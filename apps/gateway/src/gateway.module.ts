import { Module } from '@nestjs/common';
import { ProductsController } from './modules/products/products.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
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
export class GatewayModule {}
