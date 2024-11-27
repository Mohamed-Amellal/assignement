// generate module

import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesSchema } from 'src/schema/sales.schema';
import { ProductSchema } from 'src/schema/products.schema';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Sales', schema: SalesSchema }, { name: 'Products', schema: ProductSchema }]) ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})

export class AnalyticsModule {}
