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
    const PORT =
        config.get('SERVICE_PRODUCTS_PORT') || config.get('PORT') || 3001;

    const microserviceOptions: MicroserviceOptions = {
        transport: Transport.REDIS,
        options: {
            host: HOST,
            port: PORT
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const microservice = app.connectMicroservice<MicroserviceOptions>(
        microserviceOptions,
        { inheritAppConfig: true }
    );

    await app.startAllMicroservices();
    logger.log(`Microservice is running on port ${PORT}`);
}
bootstrap();
