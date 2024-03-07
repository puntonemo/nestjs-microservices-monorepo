import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger('GATEWAY');
    const app = await NestFactory.create(GatewayModule);
    await app.listen(3000);
    logger.log('Gateway is running on port 3000');
}
bootstrap();
