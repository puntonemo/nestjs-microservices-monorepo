import { Module } from '@nestjs/common';
import {
    ClientProxyFactory,
    MicroserviceOptions,
    Transport
} from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [
        {
            provide: 'SERVICE_PRODUCTS',
            useFactory: (config: ConfigService) => {
                const REDIS_HOST = config.get('SERVICE_PRODUCTS_REDIS_HOST');
                const REDIS_USE_TLS =
                    config.get('SERVICE_PRODUCTS_REDIS_USE_TLS') === 'true' ||
                    false;
                const REDIS_PORT =
                    config.get('SERVICE_PRODUCTS_REDIS_PORT') ||
                    config.get('PORT') ||
                    3001;
                const REDIS_PASSWORD = config.get(
                    'SERVICE_PRODUCTS_REDIS_PASSWORD'
                );
                if (REDIS_HOST) {
                    const microserviceOptions: MicroserviceOptions =
                        REDIS_USE_TLS
                            ? {
                                  transport: Transport.REDIS,
                                  options: {
                                      tls: {
                                          host: REDIS_HOST,
                                          port: REDIS_PORT
                                      },
                                      // username: '',
                                      password: REDIS_PASSWORD
                                  }
                              }
                            : {
                                  transport: Transport.REDIS,
                                  options: {
                                      host: REDIS_HOST,
                                      port: REDIS_PORT,
                                      // username: '',
                                      password: REDIS_PASSWORD
                                  }
                              };
                    console.log(microserviceOptions);
                    return ClientProxyFactory.create(microserviceOptions);
                }
            },
            inject: [ConfigService]
        }
    ]
})
export class ProductsModule {}
