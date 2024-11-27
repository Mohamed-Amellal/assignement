import { Inject, Injectable } from "@nestjs/common"; // Import NestJS decorators for dependency injection
import { InjectModel } from "@nestjs/mongoose"; // Import to inject mongoose models into the service
import { Model, Query } from "mongoose"; // Import Mongoose Model and Query types
import { Product } from "src/common/products.interface"; // Product interface
import { SalesModule } from "src/sales/sales.module"; // Sales module for dependency injection
import { Sales } from "src/schema/sales.schema"; // Sales schema

/**
 * Interface to represent trending sales data.
 */
export interface trend_sales {
  name: string;      // Name of the product
  quantity: number;  // Quantity of the product sold
  total: number;     // Total sales amount for the product
}

/**
 * Interface to represent category sales data.
 */
export interface category_sales {
  category: string;  // Category name
  total: number;     // Total sales amount for the category
  percentage: number; // Sales percentage of the category out of total sales
}

@Injectable()
export class AnalyticsService {

  /**
   * Constructor to inject the required models for Sales and Products.
   * @param salesModel - The Mongoose model for accessing the 'Sales' collection.
   * @param productModel - The Mongoose model for accessing the 'Products' collection.
   */
  constructor(
    @InjectModel('Sales') private readonly salesModel: Model<Sales>,
    @InjectModel('Products') private readonly productModel: Model<Product>
  ) {}

  /**
   * Get the total sales amount between a specific date range.
   * @returns Total sales amount for the specified date range.
   */
  async getProducts(): Promise<number> {
    const startDate: string = '2023-07-12'; // Start date (inclusive)
    const endDate: string = '2023-08-29';  // End date (inclusive)
    try {
      // Fetch all sales events within the specified date range
      const events = await this.salesModel.find({
        Date: {
          $gte: startDate, // Greater than or equal to start date
          $lte: endDate,   // Less than or equal to end date
        },
      });

      // Calculate total sales amount by summing up the TotalAmount of each sale event
      const totalPrice: number = events.reduce(
        (sum, sale) => sum + (sale.TotalAmount || 0), 0
      );

      return totalPrice; // Return the total price
    } catch (err) {
      console.error('err:', err); // Log error if any occurs
      throw err; // Throw error to be handled elsewhere
    }
  }

  /**
   * Get the top 3 trending products based on quantity sold.
   * @returns A list of top 3 trending products.
   */
  async getTrending(): Promise<trend_sales[]> {
    try {
      // Aggregate the sales data to find the top 3 products by quantity sold
      const topSales: any = await this.salesModel.aggregate([
        { $sort: { Quantity: -1 } }, // Sort by quantity in descending order
        { $limit: 3 } // Limit results to top 3 products
      ]);

      // Extract product IDs from the top sales
      const productNames: any = topSales.map(sale => sale.ProductID);

      // Fetch product details based on the extracted ProductIDs
      const products: any = await this.productModel.find({
        ProductID: { $in: productNames }
      });

      // Map the top sales data to the trend_sales format
      const trendSales: trend_sales[] = topSales.map(sale => {
        const product = products.find(p => p.ProductID === sale.ProductID);
        return {
          name: product?.ProductName || 'N/A',  // Get product name or 'N/A' if not found
          quantity: sale.Quantity,               // Product quantity sold
          total: sale.TotalAmount                // Total sales amount for the product
        };
      });

      console.log(trendSales);  // Log the trend sales data for debugging
      return trendSales; // Return the trend sales data
    } catch (err) {
      console.error('err: ', err); // Log error if any occurs
      throw err; // Throw error to be handled elsewhere
    }
  }

  async getTrendingProduct(): Promise<trend_sales[]> {
    try {
      // Aggregate the sales data to do sum quntity for dup product
      const topSales: any = await this.salesModel.aggregate([
        {
          $group: {
            _id: '$ProductID',
            ProductID: { $first: '$ProductID' },
            Quantity: { $sum: '$Quantity' },
            TotalAmount: { $sum: '$TotalAmount' }
          }
        },
        { $sort: { Quantity: -1 } }, // Sort by quantity in descending order
      ]);
      console.log(topSales.length);



      // Extract product IDs from the top sales
      const productNames: any = topSales.map(sale => sale.ProductID);

      console.log(productNames + " : iuasbgosubguoasbg");  
      // Fetch product details based on the extracted ProductIDs
      const products: any = await this.productModel.find({
        ProductID: { $in: productNames }
      });
      console.log(products);
      // Map the top sales data to the trend_sales format
      const trendSales: trend_sales[] = topSales.map(sale => {
        const product = products.find(p => p.ProductID === sale.ProductID);
        return {
          name: product?.ProductName || 'N/A',  // Get product name or 'N/A' if not found
          quantity: sale.Quantity,               // Product quantity sold
          total: sale.TotalAmount                // Total sales amount for the product
        };
      });

      // console.log(trendSales);  // Log the trend sales data for debugging
      return trendSales; // Return the trend sales data
    } catch (err) {
      console.error('err: ', err); // Log error if any occurs
      throw err; // Throw error to be handled elsewhere
    }
  }


  /**
   * Get sales data categorized by product category.
   * @returns An array of category sales data including category name, total sales, and percentage of total sales.
   */
  async getCategorySales(): Promise<category_sales[]> {
    // Fetch all product data
    const products: any = await this.productModel.find();

    // Create an object to map product categories to product IDs
    const obj = {};
    products.forEach(product => {
      obj[product.Category] = product.ProductID;
    });

    // Fetch all sales data
    const sales: any = await this.salesModel.find();

    // Initialize an object to accumulate sales by category
    const categorySales = {};

    // Loop through each sale event and accumulate the sales by category
    sales.forEach(sale => {
      const product = products.find(p => p.ProductID === sale.ProductID);
      if (!categorySales[product.Category]) {
        categorySales[product.Category] = 0; // Initialize if category is not found
      }
      categorySales[product.Category] += sale.TotalAmount; // Add sale amount to the category total
    });

    // Calculate the total sales across all categories
    let sum: number = 0;
    for (const i in categorySales) {
      sum += categorySales[i];
    }

    // Map category sales data to the required format, including percentage of total sales
    const categorySalesArray = Object.keys(categorySales).map(category => {
      return {
        category,
        total: categorySales[category],
        percentage: (categorySales[category] / sum) * 100 // Calculate the percentage of total sales
      };
    });

    console.log(categorySalesArray); // Log the category sales array for debugging
    return categorySalesArray; // Return the category sales data
  }
}
