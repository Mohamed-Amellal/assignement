import { Document } from "mongoose";


export interface Sales extends Document {
    SalesID: number;
    ProductID: number;
    Date: string;
    Quantity: number;
    TotalAmount: number;
}
