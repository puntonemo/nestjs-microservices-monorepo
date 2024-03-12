import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DefaultModule } from './modules/default/default.module';
import { ProductsModule } from './modules/products/products.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        DefaultModule,
        ProductsModule
    ]
})
export class GatewayModule {}
