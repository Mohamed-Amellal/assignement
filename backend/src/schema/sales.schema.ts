import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Sales {

    @Prop({required: true})
    SaleID: number;

    @Prop({required: true})
    ProductID: number;

    @Prop({required: true})
    Date: string;

    @Prop({required: true})
    Quantity: number;

    @Prop({required: true})
    TotalAmount: number;
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
