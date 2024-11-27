import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales } from 'src/schema/sales.schema';

@Injectable()
export class SalesService
{
    constructor(@InjectModel('Sales') private readonly salesModel: Model<Sales>) {}
    async getSales() {
        return this.salesModel.find();
    }

    async getSaleById(saleId) {
        // search by product not id
        const ret = this.salesModel.findOne({ ProductID: saleId });
        // return date and totalamout
        return ret;
    }
}