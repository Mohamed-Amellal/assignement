import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/products.schema'

import * as fs from 'fs';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Product') private readonly ProductModel: Model<Products>) {}

  async onModuleInit() {
    const count = await this.ProductModel.countDocuments();
    if (count === 0) {
      console.log('Seeding data for the first time...');
      const data = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
      // Convert `id` to number for each object in the array
      const processedData = data.map((item) => ({
        ...item,
        id: parseInt(item.ProductID, 10), // Convert `id` from string to number
      }));

      await this.ProductModel.insertMany(processedData);
      console.log('Seeding completed!');
    }
  }
}
