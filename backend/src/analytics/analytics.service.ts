import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { exit } from "process";
import { Product } from "src/common/products.interface";
import { SalesModule } from "src/sales/sales.module";
import { Sales } from "src/schema/sales.schema";

export interface trend_sales {
  name: string;
  Quantity: number;
  TotalAmount: number;
}

export interface category_sales {
  category: string;
  total: number;
  percentage: number;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('Sales') private readonly salesModel: Model<Sales>,
    @InjectModel('Products') private readonly productModel: Model<Product>
  ) {}

  /**
   * Get the total sales amount between a specific date range.
   * @param endDate - The end date for the sales period.
   * @returns Total sales amount for the specified date range.
   */
  async getProducts(endDate: string): Promise<number> {
    const startDate: string = new Date().toISOString().split('T')[0];
    console.log(startDate);
    console.log(endDate);
    try {
      const events: any[] = await this.salesModel.find({
        Date: {
          $gte: endDate,
          $lte: startDate,
        },
      });
      const totalPrice: number = events.reduce(
        (sum, sale) => sum + (sale.TotalAmount || 0), 0
      );
      console.log(totalPrice);
      return totalPrice;
    } catch (err: any) {
      throw err;
    }
  }

  /**
   * Get the top 3 trending products based on quantity sold.
   * @returns A list of top 3 trending products.
   */
  async getTrending(): Promise<trend_sales[]> {
    try {
      const topSales: any[] = await this.salesModel.aggregate([
        { $sort: { Quantity: -1 } },
        { $limit: 3 }
      ]);
      const productNames: number[] = topSales.map(sale => sale.ProductID);
      const products: any[] = await this.productModel.find({
        ProductID: { $in: productNames }
      });
      const trendSales: trend_sales[] = topSales.map(sale => {
        const product = products.find(p => p.ProductID === sale.ProductID);
        return {
          name: product?.ProductName || 'N/A',
          Quantity: sale.Quantity,
          TotalAmount: sale.TotalAmount
        };
      });
      return trendSales;
    } catch (err: any) {
      throw err;
    }
  }

  /**
   * Get the top trending products based on quantity sold, aggregated by product.
   * @returns A list of top trending products.
   */
  async getTrendingProduct(): Promise<trend_sales[]> {
    try {
      const topSales: any[] = await this.salesModel.aggregate([
        {
          $group: {
            _id: '$ProductID',
            ProductID: { $first: '$ProductID' },
            Quantity: { $sum: '$Quantity' },
            TotalAmount: { $sum: '$TotalAmount' }
          }
        },
        { $sort: { Quantity: -1 } },
      ]);
      const productNames: number[] = topSales.map(sale => sale.ProductID);
      const products: any[] = await this.productModel.find({
        ProductID: { $in: productNames }
      });
      const trendSales: trend_sales[] = topSales.map(sale => {
        const product = products.find(p => p.ProductID === sale.ProductID);
        return {
          name: product?.ProductName || 'N/A',
          Quantity: sale.Quantity,
          TotalAmount: sale.TotalAmount
        };
      });
      return trendSales;
    } catch (err: any) {
      throw err;
    }
  }

  /**
   * Get sales data categorized by product category.
   * @returns An array of category sales data including category name, total sales, and percentage of total sales.
   */
  async getCategorySales(): Promise<category_sales[]> {
    const products: any[] = await this.productModel.find();
    const obj: { [key: string]: number } = {};
    products.forEach(product => {
      obj[product.Category] = product.ProductID;
    });
    const sales: any[] = await this.salesModel.find();
    const categorySales: { [key: string]: number } = {};
    sales.forEach(sale => {
      const product = products.find(p => p.ProductID === sale.ProductID);
      if (!categorySales[product.Category]) {
        categorySales[product.Category] = 0;
      }
      categorySales[product.Category] += sale.TotalAmount;
    });
    let sum: number = 0;
    for (const i in categorySales) {
      sum += categorySales[i];
    }
    const categorySalesArray: category_sales[] = Object.keys(categorySales).map(category => {
      return {
        category,
        total: categorySales[category],
        percentage: (categorySales[category] / sum) * 100
      };
    });
    return categorySalesArray;
  }

  /**
   * Filter products by date.
   * @param endDate - The end date for filtering products.
   * @returns Filtered products within the specified date range.
   */
  async filterProductByDate(endDate: string): Promise<void> {
    const startDate: string = new Date().toISOString().split('T')[0];
    console.log(startDate);
    console.log(endDate);
    try {
      const events: any[] = await this.salesModel.find({
        Date: {
          $gte: endDate,
          $lte: startDate,
        },
      });
      for (let i = 0; i < events.length; i++) {
        let count: number = 0;
        for (let j = 0; j < events.length; j++) {
          if (events[i].ProductID == events[j].ProductID) {
            count++;
          }
        }
        console.log(count);
      }
    } catch (err: any) {
      console.error('err:', err); 
      throw err; 
    }
  }

  /**
   * Get sales data within a specific period.
   * @param formatdate - The start date for the sales period.
   * @returns Sales data within the specified period.
   */
  async getSalesInPeriod(formatdate: string): Promise<trend_sales[]> {
    const startDate: string = formatdate; 
    const endDate: string = new Date().toISOString().split('T')[0]; 
    const topSales: any[] = await this.salesModel.aggregate([
      {
        $match: {
          Date: {
            $gte: startDate, 
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$ProductID',
          ProductID: { $first: '$ProductID' },
          Quantity: { $sum: '$Quantity' },
          TotalAmount: { $sum: '$TotalAmount' }
        }
      }
    ]);
    const productNames: number[] = topSales.map(sale => sale.ProductID);
    const products: any[] = await this.productModel.find({
      ProductID: { $in: productNames }
    });
    const trendSales: trend_sales[] = topSales.map(sale => {
      const product = products.find(p => p.ProductID === sale.ProductID);
      return {
        name: product?.ProductName || 'N/A',
        Quantity: sale.Quantity,
        TotalAmount: sale.TotalAmount
      };
    });
    return trendSales;
  }
}