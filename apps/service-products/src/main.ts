import { NestFactory } from '@nestjs/core';
import { ServiceProductsModule } from './service-products.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ServiceProductsModule);
    const config = app.get<ConfigService>(ConfigService);
    const logger = new Logger('SERVICE-PRODUCTS');

    const HYBRID_PORT =
        config.get('SERVICE_PRODUCTS_HYBRID_PORT') ||
        config.get('PORT') ||
        undefined;
    const REDIS_HOST = config.get('SERVICE_PRODUCTS_REDIS_HOST');
    const REDIS_USE_TLS =
        config.get('SERVICE_PRODUCTS_REDIS_USE_TLS') === 'true' || false;
    const REDIS_PORT =
        config.get('SERVICE_PRODUCTS_REDIS_PORT') || config.get('PORT') || 3001;
    const REDIS_PASSWORD = config.get('SERVICE_PRODUCTS_REDIS_PASSWORD');

    if (REDIS_HOST) {
        const microserviceOptions: MicroserviceOptions = REDIS_USE_TLS
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const microservice = app.connectMicroservice<MicroserviceOptions>(
            microserviceOptions,
            { inheritAppConfig: true }
        );
    }
    await app.startAllMicroservices();
    logger.log(`Microservice is running`);
    if (HYBRID_PORT) {
        await app.listen(HYBRID_PORT);
        logger.log(`Hybrid app is running on port ${await app.getUrl()}`);
    }
}
bootstrap();
