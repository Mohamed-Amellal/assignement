import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  /**
   * Endpoint to get all sales.
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @returns A JSON response containing all sales or an error message.
   * */
  @Get()
  async getAllSales(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const sales: any[] = await this.salesService.getSales();
      res.status(200).json({ sales });
    } catch (error: any) {
      console.error('Error fetching sales:', error);
      res.status(500).json({ message: 'Failed to fetch sales', error });
    }
  }

  /**
   * Endpoint to get a sale by ID.
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @returns A JSON response containing the sale or an error message.
   * 
   */
  @Get('/:id')
  async getSaleById(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const saleId: string = req.params.id;
      if (!saleId) {
        res.status(400).json({ message: 'Sale ID is required' });
        return;
      }
      const sale: any = await this.salesService.getSaleById(saleId);
      if (sale) {
        res.status(200).json({ sale });
      } else {
        res.status(404).json({ message: 'Sale not found' });
      }
    } catch (error: any) {
      console.error('Error fetching sale by ID:', error);
      res.status(500).json({ message: 'Failed to fetch sale by ID', error });
    }
  }
}
