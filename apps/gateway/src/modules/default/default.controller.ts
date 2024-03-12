import { Controller, Get } from '@nestjs/common';

@Controller()
export class DefaultController {
    constructor() {}
    @Get()
    default() {
        return 'Gateway echo service';
    }
}
