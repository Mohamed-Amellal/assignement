// genearte controller for analytics

import { Controller, Get } from '@nestjs/common';
import {AnalyticsService}  from './analytics.service'

@Controller('analytics')
export class AnalyticsController {
    constructor(private  AnalyticsService: AnalyticsService){}
    @Get('total_sales')
    getSales() { 
        const ret = this.AnalyticsService.getProducts()
        return ret;
    }

    @Get('trending_products')
    getTrending() {
        const ret =  this.AnalyticsService.getTrending()
        return ret
    }

    @Get('category_sales')
    getCategorySales() {
        return 'Category sales';
    }

}
