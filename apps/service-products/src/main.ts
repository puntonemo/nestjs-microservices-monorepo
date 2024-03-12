import { NestFactory } from '@nestjs/core';
import { ServiceProductsModule } from './service-products.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ServiceProductsModule);
    const configService = app.get<ConfigService>(ConfigService);
    const PORT =
        configService.get('SERVICE_PRODUCTS_PORT') ||
        configService.get('PORT') ||
        3001;
    const serviceConfig: MicroserviceOptions = {
        transport: Transport.TCP,
        options: {
            port: PORT
        }
    };
    // await app.listen(3001);
    const logger = new Logger('SERVICE-PRODUCTS');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const microservice = app.connectMicroservice<MicroserviceOptions>(
        serviceConfig,
        { inheritAppConfig: true }
    );

    await app.startAllMicroservices();
    logger.log(`Microservice is running on port ${PORT}`);
}
bootstrap();
