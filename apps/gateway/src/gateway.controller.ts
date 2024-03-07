import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Controller()
export class GatewayController {
    constructor(
        private readonly gatewayService: GatewayService,
        @Inject('SERVICE_PRODUCTS') private readonly clientA: ClientProxy
    ) {}

    @Get()
    async getHello(): Promise<string> {
        const result = await firstValueFrom(
            this.clientA.send('product.findOne', '1').pipe(timeout(5000))
        );
        console.log(result);
        return this.gatewayService.getHello();
    }
}
