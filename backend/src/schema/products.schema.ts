import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Products {

    @Prop({required: true})
    ProductID: number;

    @Prop({required: true})
    ProductName: string;

    @Prop({required: true})
    Category: string;

    @Prop({required: true})
    Price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Products);