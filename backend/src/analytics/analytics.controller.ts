// genearte controller for analytics

import { Controller, Get } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
    @Get('total_sales')
    getSales() {
    
    }

    @Get('trending_products')
    getTrending() {
        return 'Trending products';
    }

    @Get('category_sales')
    getCategorySales() {
        return 'Category sales';
    }

}
