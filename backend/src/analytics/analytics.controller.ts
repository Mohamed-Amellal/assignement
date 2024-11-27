import { Controller, Get, Req, Res } from '@nestjs/common'; // Import NestJS decorators
import { Request, Response } from 'express'; // Import Request and Response types from Express for custom handling
import { AnalyticsService } from './analytics.service'; // Import the service responsible for business logic

/**
 * @Controller('analytics')
 * Handles all analytics-related endpoints for sales and trending data.
 */
@Controller('analytics')
export class AnalyticsController {
  
  /**
   * Constructor to inject the AnalyticsService.
   * @param analyticsService - The service responsible for handling business logic related to analytics.
   */
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * GET /analytics/total_sales
   * Endpoint to fetch the total sales from the database or service.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing total sales number.
   */
  @Get('total_sales')
  async getSales(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // Fetch the total sales from the AnalyticsService
      const totalSales = await this.analyticsService.getProducts();
      // Return the total sales in JSON format with a 200 status
      res.status(200).json({ totalSales });
    } catch (error) {
      // If an error occurs, return a 500 status with error details
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  /**
   * GET /analytics/trending_products
   * Endpoint to fetch the list of trending products.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing the list of trending products.
   */
  @Get('trending_products')
  async getTrending(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // Fetch the trending products from the AnalyticsService
      const trendingProducts = await this.analyticsService.getTrending();
      // Return the trending products in JSON format with a 200 status
      res.status(200).json({ trendingProducts });
    } catch (error) {
      // If an error occurs, return a 500 status with error details
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  @Get('trending_products/all')
  async getallproduct(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // Fetch the trending products from the AnalyticsService
      const trendingProducts = await this.analyticsService.getTrendingProduct();
      // Return the trending products in JSON format with a 200 status
      res.status(200).json({ trendingProducts });
    } catch (error) {
      // If an error occurs, return a 500 status with error details
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }

  /**
   * GET /analytics/category_sales
   * Endpoint to fetch the sales data by category.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   * @returns JSON response containing sales categorized by product category.
   */
  @Get('category_sales')
  async getCategorySales(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      // Fetch the category sales data from the AnalyticsService
      const categorySales = await this.analyticsService.getCategorySales();
      // Return the category sales data in JSON format with a 200 status
      res.status(200).json({ categorySales });
    } catch (error) {
      // If an error occurs, return a 500 status with error details
      res.status(500).json({ message: 'Err 500 Internal server error', error });
    }
  }
}
