import { Module } from '@nestjs/common';
import { ProductsController } from './modules/products/products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ClientsModule.registerAsync([
            {
                name: 'SERVICE_PRODUCTS',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('SERVICE_PRODUCTS_HOST'),
                        port: configService.get('SERVICE_PRODUCTS_PORT')
                    }
                })
            }
        ])
        // ClientsModule.register([
        //     {
        //         name: 'SERVICE_PRODUCTS',
        //         transport: Transport.TCP,
        //         options: {
        //             host: 'localhost',
        //             port: 3001
        //         }
        //     }
        // ])
    ],
    controllers: [ProductsController],
    providers: []
})
export class GatewayModule {}
