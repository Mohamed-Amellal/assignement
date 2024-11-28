// start service fiel

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/common/products.interface';
@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    /**
     * Get all products.
     * @returns A list of all products.
     * 
     * Example response:
     * [
     *   { "id": "1", "name": "Product A", "category": "Category 1" },
     *   { "id": "2", "name": "Product B", "category": "Category 2" }
     * ]
     */
    async getProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    /**
     * Get products by category.
     * @param category - The category to filter products by.
     * @returns The product that matches the given category.
     * 
     * Example response:
     * { "id": "1", "name": "Product A", "category": "Category 1" }
     */
    async getProductsByCategory(category: string): Promise<Product | null> {
        return this.productModel.findOne({Category: category}).exec();
    }
}