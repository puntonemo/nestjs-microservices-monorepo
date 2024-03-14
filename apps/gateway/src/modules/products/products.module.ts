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
            useFactory: (config: ConfigService) => {
                const HOST = config.get('SERVICE_PRODUCTS_HOST') || 'localhost';
                const HOST_TLS = config.get('SERVICE_PRODUCTS_HOST_TLS');
                const PORT =
                    config.get('SERVICE_PRODUCTS_PORT') ||
                    config.get('PORT') ||
                    3001;
                const PASSWORD = config.get('SERVICE_PRODUCTS_PASSWORD');
                return ClientProxyFactory.create(
                    HOST_TLS
                        ? {
                              transport: Transport.REDIS,
                              options: {
                                  tls: {
                                      host: HOST_TLS || undefined,
                                      port: HOST_TLS ? PORT : undefined
                                  },
                                  // username: '',
                                  password: PASSWORD
                              }
                          }
                        : {
                              transport: Transport.REDIS,
                              options: {
                                  host: HOST,
                                  port: PORT,
                                  // username: '',
                                  password: PASSWORD
                              }
                          }
                );
            },
            inject: [ConfigService]
        }
    ]
})
export class ProductsModule {}
