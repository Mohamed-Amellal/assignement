import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales } from 'src/schema/sales.schema';

@Injectable()
export class SalesService
{
    constructor(@InjectModel('Sales') private readonly salesModel: Model<Sales>) {}
    async getProducts() {
        return this.salesModel.find();
        
    }
}