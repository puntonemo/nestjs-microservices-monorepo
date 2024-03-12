import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const logger = new Logger('GATEWAY');
    const app = await NestFactory.create(GatewayModule);
    const configService = app.get<ConfigService>(ConfigService);
    const PORT = configService.get('PORT') || 3000;
    await app.listen(PORT);
    logger.log(`Gateway is running on port ${PORT}`);
}
bootstrap();
