import { IsDate, IsNumber, IsString } from "class-validator";

export class SalesDto {

    @IsNumber()
    SaleID: number;

    @IsNumber()
    ProductID: number;

    @IsDate()
    Date: string;

    @IsNumber()
    Quantity: number;

    @IsNumber()
    TotalAmount: number;
}