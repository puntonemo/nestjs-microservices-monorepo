import { NestFactory } from '@nestjs/core';
import { ServiceProductsModule } from './service-products.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(ServiceProductsModule);

    const serviceConfig: MicroserviceOptions = {
        transport: Transport.TCP,
        options: {
            port: 3001
        }
    };
    // await app.listen(3001);
    const logger = new Logger('SERVICE-A');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const microservice = app.connectMicroservice<MicroserviceOptions>(
        serviceConfig,
        { inheritAppConfig: true }
    );

    await app.startAllMicroservices();
    logger.log('Microservice is listening on port 3001');
}
bootstrap();
