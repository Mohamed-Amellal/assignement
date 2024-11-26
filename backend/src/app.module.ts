import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ProductSchema } from 'src/schema/products.schema';
import { Sales, SalesSchema } from 'src/schema/sales.schema';
@Module({
  imports: [
    // Set up the MongoDB connection string here
    MongooseModule.forRoot('mongodb://exampleUser:examplePassword@localhost:27017/ecosite?authSource=admin'),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost:27017/ecosite'),
//     MongooseModule.forFeature([
//       { name: 'Product', schema: ProductSchema },
//       { name: 'sales', schema: SalesSchema },
//     ]),
//     ProductsModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



