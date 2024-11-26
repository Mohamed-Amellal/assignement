// generate controller

import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Get()
    getAllProducts() {
        console.log('get all products');
        const product = this.productsService.getProducts();
        return product;
    }
}