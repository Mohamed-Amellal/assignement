import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ProductSchema } from 'src/schema/products.schema';
import { Sales, SalesSchema } from 'src/schema/sales.schema';
import { SalesModule } from './sales/sales.module';
import { AnalyticsModule } from './analytics/analytics.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: "mongodb://exampleUser:examplePassword@mongodb:27017/ecosite?authSource=admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }, {name : 'Sales', schema: SalesSchema}]),
    ProductsModule, SalesModule, AnalyticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


