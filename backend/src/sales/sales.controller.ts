import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';


@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {}
    @Get()
    getAllProducts() {
        console.log('get all products');
        const sales = this.salesService.getProducts();
        return sales;
    }
}