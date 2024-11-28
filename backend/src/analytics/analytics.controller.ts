import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AnalyticsService, category_sales, trend_sales } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * Endpoint to fetch the total sales from the database or service.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing total sales number.
   * 
   * Example response:
   * {
   *   1500
   * }
   */
  @Get('total_sales/:formatdate')
  async getSales(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const totalSales: number = await this.analyticsService.getProducts(req.params.formatdate);
      res.status(200).json({ totalSales });
    } catch (error: any) {
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  /**
   * Endpoint to fetch the list of trending products.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing the list of trending products.
   * 
   * Example response:
   * {
   *   "trendingProducts": [
   *     { "name": "Product X", "Quantity": 100, "TotalAmount": 1000 },
   *     { "name": "Product Y", "Quantity": 80, "TotalAmount": 800 },
   *     { "name": "Product Z", "Quantity": 60, "TotalAmount": 600 }
   *   ]
   * }
   */
  @Get('trending_products')
  async getTrending(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const trendingProducts: trend_sales[] = await this.analyticsService.getTrending();
      res.status(200).json({ trendingProducts });
    } catch (error: any) {
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  /**
   * Endpoint to fetch all trending products.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing the list of all trending products.
   */
  @Get('trending_products/all')
  async getallproduct(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const trendingProducts: trend_sales[] = await this.analyticsService.getTrendingProduct();
      res.status(200).json({ trendingProducts });
    } catch (error: any) {
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  /**
   * Endpoint to fetch the sales data by category.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing sales categorized by product category.
   * 
   * Example response:
   * {
   *   "categorySales": [
   *     { "category": "Category X", "total": 500, "percentage": 50 },
   *     { "category": "Category Y", "total": 300, "percentage": 30 },
   *     { "category": "Category Z", "total": 200, "percentage": 20 }
   *   ]
   * }
   */
  @Get('category_sales')
  async getCategorySales(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const categorySales: category_sales[] = await this.analyticsService.getCategorySales();
      res.status(200).json({ categorySales });
    } catch (error: any) {
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  /**
   * Endpoint to fetch sales data within a specific period.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing sales data within the specified period.
   */
  @Get('datefilter/:formatdate')
  async getSalesByDate(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const trendingProducts: trend_sales[] = await this.analyticsService.getSalesInPeriod(req.params.formatdate);
      res.status(200).json({ trendingProducts });
    } catch (error: any) {
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }
}
