import { Document } from "mongoose";

export interface Product extends Document {
    ProductID: number;
    ProductName: string;
    Category: string;
    Price: number;
}