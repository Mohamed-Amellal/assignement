import { Controller, Get, Req, Res } from '@nestjs/common'; // Import necessary decorators from NestJS
import { Request, Response } from 'express'; // Import Request and Response from Express
import { SalesService } from './sales.service'; // Import the SalesService

@Controller('sales') // Define the route prefix for this controller
export class SalesController {
  
  /**
   * Constructor to inject the SalesService.
   * @param salesService - The SalesService instance for handling business logic.
   */
  constructor(private readonly salesService: SalesService) {}

  /**
   * Endpoint to get all sales.
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @returns A JSON response containing all sales or an error message.
   */
  @Get() // Define the GET request handler for the '/sales' endpoint
  async getAllSales(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // Log the request to the console for debugging
      console.log('Received request to get all sales');
      
      // Call the SalesService to get the list of sales
      const sales = await this.salesService.getSales();
      
      // Return the sales in the response as JSON
      res.status(200).json({ sales });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching sales:', error);
      
      // Respond with a 500 Internal Server Error and an error message
      res.status(500).json({ message: 'Failed to fetch sales', error });
    }
  }

  @Get('/:id') 
  async getSaleById(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      console.log('Received request to get sale by ID');
      
      const saleId = req.params.id;
      console.log('Sale ID:', saleId);
      const sale = await this.salesService.getSaleById(saleId);
      console.log('Sale:', sale);
      if (sale) {
        res.status(200).json({ sale });
      } else {
        res.status(404).json({ message: 'Sale not found' });
      }
    } catch (error) {
      console.error('Error fetching sale by ID:', error);
      res.status(500).json({ message: 'Failed to fetch sale by ID', error });
    }
  }
}
