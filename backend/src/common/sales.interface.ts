import { Document } from "mongoose";


export interface Sales extends Document {
    SaleID: number;
    ProductID: number;
    Date: string;
    Quantity: number;
    TotalAmount: number;
}
