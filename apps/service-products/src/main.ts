import { NestFactory } from '@nestjs/core';
import { ServiceProductsModule } from './service-products.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ServiceProductsModule);
    const config = app.get<ConfigService>(ConfigService);
    const logger = new Logger('SERVICE-PRODUCTS');

    const PORT =
        config.get('SERVICE_PRODUCTS_PORT') || config.get('PORT') || 3001;
    // const microserviceOptions: MicroserviceOptions = {
    //     transport: Transport.TCP,
    //     options: {
    //         host: '0.0.0.0',
    //         port: PORT
    //     }
    // };

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const microservice = app.connectMicroservice<MicroserviceOptions>(
    //     microserviceOptions,
    //     { inheritAppConfig: true }
    // );

    // await app.startAllMicroservices();
    // logger.log(`Microservice is running on port ${PORT}`);
    await app.listen(PORT);
    logger.log(`Hybrid app is running on port ${PORT}`);
}
bootstrap();
