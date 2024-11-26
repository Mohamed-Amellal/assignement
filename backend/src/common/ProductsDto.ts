import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductsDto {

    @IsNumber()
    ProductID: number;

    @IsString()
    @IsNotEmpty()
    ProductName: string;

    @IsString()
    @IsNotEmpty()
    Category: string;
    
    @IsNumber()
    Price: number;
}