import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint to get all products.
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @returns A JSON response containing all products or an error message.
   * 
   * Example response:
   * {
   *   "products": [
   *     { "id": "1", "name": "Product X", "category": "Category X" },
   *     { "id": "2", "name": "Product Y", "category": "Category Y" }
   *   ]
   * }
   */
  @Get()
  async getAllProducts(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const products: any[] = await this.productsService.getProducts();
      res.status(200).json({ products });
    } catch (error: any) {
      console.error('Err:', error);
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }
}