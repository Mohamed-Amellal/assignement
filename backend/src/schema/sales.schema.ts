import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Sales {

    @Prop({required: true})
    SalesID: number;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
    ProductID: number;

    @Prop({required: true})
    Date: string;

    @Prop({required: true})
    Quantity: number;

    @Prop({required: true})
    TotalAmount: number;
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
