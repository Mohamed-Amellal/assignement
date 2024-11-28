import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/products.schema';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { Sales } from './schema/sales.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Products>,
    @InjectModel('Sales') private readonly SalesModel: Model<Sales>
  ) {}

  async onModuleInit(): Promise<void> {
    const count: number = await this.ProductModel.countDocuments();
    if (count === 0) {
      const data: any[] = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
      const processedData: any[] = data.map((item) => ({
        ...item,
        ProductID: parseInt(item.ProductID, 10),
      }));
      await this.ProductModel.insertMany(processedData);
    }
    const countSales: number = await this.SalesModel.countDocuments();
    if (countSales === 0) {
      const data_s: any[] = JSON.parse(fs.readFileSync('./sales.json', 'utf8'));
      const processedData_s: any[] = data_s.map((item) => ({
        ...item,
        SaleID: parseInt(item.SaleID, 10),
        ProductID: parseInt(item.ProductID, 10),
        TotalAmount: parseInt(item.TotalAmount, 10),
      }));
      await this.SalesModel.insertMany(processedData_s);
    }
  }
}
