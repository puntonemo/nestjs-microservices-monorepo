import { NestFactory } from '@nestjs/core';
import { ServiceProductsModule } from './service-products.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ServiceProductsModule);
    const config = app.get<ConfigService>(ConfigService);
    const logger = new Logger('SERVICE-PRODUCTS');

    const HOST = config.get('SERVICE_PRODUCTS_HOST') || 'localhost';
    const HOST_TLS = config.get('SERVICE_PRODUCTS_HOST_TLS');
    const PORT =
        config.get('SERVICE_PRODUCTS_PORT') || config.get('PORT') || 3001;
    const PASSWORD = config.get('SERVICE_PRODUCTS_PASSWORD');

    const microserviceOptions: MicroserviceOptions = HOST_TLS
        ? {
              transport: Transport.REDIS,
              options: {
                  tls: {
                      host: HOST_TLS,
                      port: PORT
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
          };
    console.log(microserviceOptions);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const microservice = app.connectMicroservice<MicroserviceOptions>(
        microserviceOptions,
        { inheritAppConfig: true }
    );

    await app.startAllMicroservices();
    logger.log(`Microservice is running on port ${PORT}`);
}
bootstrap();
