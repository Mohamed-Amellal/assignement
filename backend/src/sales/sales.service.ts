import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/schema/products.schema';
import { Sales } from 'src/schema/sales.schema';

@Injectable()
export class SalesService
{
    constructor(@InjectModel('Sales') private readonly salesModel: Model<Sales>) {}
    async getSales() {
        return this.salesModel.find();
    }

    async getSaleById(saleId) {
        const ret = this.salesModel
        .find({ ProductID: saleId })
        .sort({ Date: 1 }) 
        .limit(1);
        return ret;
    }
    }
    