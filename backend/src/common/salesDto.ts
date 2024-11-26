import { IsNumber, IsString } from "class-validator";

export class SalesDto {

    @IsNumber()
    SalesID: number;

    @IsNumber()
    ProductID: number;

    @IsString()
    Date: string;

    @IsNumber()
    Quantity: number;

    @IsNumber()
    TotalAmount: number;
}