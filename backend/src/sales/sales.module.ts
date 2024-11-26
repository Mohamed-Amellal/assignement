// geneate a new module

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sales, SalesSchema } from 'src/schema/sales.schema';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Sales', schema: SalesSchema }, ])], // Match with AppModule
    controllers: [SalesController],
    providers: [SalesService],
  })
  export class SalesModule {}   // geneate a new module
  
  