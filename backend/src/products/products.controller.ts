import { Controller, Get, Req, Res } from '@nestjs/common'; // Import necessary decorators from NestJS
import { Request, Response } from 'express'; // Import Request and Response from Express
import { ProductsService } from './products.service'; // Import the ProductsService

@Controller('products') // Define the route prefix for this controller
export class ProductsController {
  
  /**
   * Constructor to inject the ProductsService.
   * @param productsService - The ProductsService instance for handling business logic.
   */
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Endpoint to get all products.
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @returns A JSON response containing all products or an error message.
   */
  @Get() // Define the GET request handler for the '/products' endpoint
  async getAllProducts(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // Log the request to the console for debugging
      console.log('Received request to get all products');
      
      // Call the ProductsService to get the list of products
      const products = await this.productsService.getProducts();
      
      // Return the products in the response as JSON
      res.status(200).json({ products });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Err:', error);
      
      // Respond with a 500 Internal Server Error and an error message
      res.status(500).json({ message:'Err 500 Internak server error', error });
    }
  }

  // @Get(':Category') // Define the GET request handler for the '/products' endpoint
  // async getProductsByCategory(@Req() req: Request, @Res() res: Response): Promise<void> {
  //   try {
  //     // Log the request to the console for debugging
  //     console.log('Received request to get all products');
      
  //     // Call the ProductsService to get the list of products
  //     const products = await this.productsService.getProductsByCategory(req.params.Category);
      
  //     // Return the products in the response as JSON
  //     res.status(200).json({ products });
  //   } catch (error) {
  //     // Handle any errors that occur during the request
  //     console.error('Err:', error);
      
  //     // Respond with a 500 Internal Server Error and an error message
  //     res.status(500).json({ message:'Err 500 Internak server error', error });
  //   }
  // }
}
