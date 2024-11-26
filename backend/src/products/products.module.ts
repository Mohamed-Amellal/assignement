// geneate a new module

import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schema/products.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])], // Match with AppModule
    controllers: [ProductsController],
    providers: [ProductsService],
  })
  export class ProductsModule {}
  
  