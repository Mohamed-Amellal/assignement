import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/products.schema'

import * as fs from 'fs';
import { Model } from 'mongoose';
import { Sales } from './schema/sales.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Product') private readonly ProductModel: Model<Products>, 
      @InjectModel('Sales') private readonly SalesModel: Model<Sales>) {}

  async onModuleInit() {
    const count = await this.ProductModel.countDocuments();
    if (count === 0) {
      console.log('Seeding data for the first time...');
      const data = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
      // Convert `id` to number for each object in the array
      const processedData = data.map((item) => ({
        ...item,
        ProductID: parseInt(item.ProductID, 10), // Convert `id` from string to number
      }));

      await this.ProductModel.insertMany(processedData);
      console.log('Seeding completed!');
    }
    const countSales = await this.SalesModel.countDocuments();
    if (countSales === 0) {
      console.log('Seeding data for the first time...');
      const data_s = JSON.parse(fs.readFileSync('./sales.json', 'utf8'));
      // Convert `id` to number for each object in the array
      console.log(data_s.length)
      const processedData_s = data_s.map((item) => ({
        ...item,
        SaleID: parseInt(item.SaleID, 10),
        // Date :  new Date(item.Date),
        ProductID: parseInt(item.ProductID, 10),
        TotalAmount: parseInt(item.TotalAmount, 10) // Convert `id` from string to number
      }));

      await this.SalesModel.insertMany(processedData_s)
    }
  }
}
