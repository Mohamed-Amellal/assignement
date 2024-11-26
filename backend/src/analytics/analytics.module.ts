// generate module

import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesSchema } from 'src/schema/sales.schema';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Sales', schema: SalesSchema }])],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})

export class AnalyticsModule {}
