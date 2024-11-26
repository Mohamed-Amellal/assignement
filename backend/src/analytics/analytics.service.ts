import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Sales } from "src/schema/sales.schema";

@Injectable()
export class AnalyticsService {
    constructor(@InjectModel('Sales') private readonly salesModel: Model<Sales>) {}
    async getProducts() {
        const startDate = '2023-07-12'; // Start date (inclusive)
        const endDate = '2023-08-29';  // End date (inclusive)
        try {
            const events = await this.salesModel.find({
              Date: {
                $gte: startDate, // Greater than or equal to the start date
                $lte: endDate,   // Less than or equal to the end date
              },
            });
            console.log('Events in range:', events.length);
            const totalPrice = events.reduce((sum, sale) => sum + (sale.TotalAmount || 0), 0);
            return totalPrice;
          } catch (err) {
            console.error('Error fetching events:', err);
          }
        }

        async getTrending()
        {
          try {
            const topSales = await this.salesModel.aggregate([
              { $sort: { Quantity: -1 } }, // Sort by price in descending order
              { $limit: 3 } // Limit the result to 3 documents
            ]);
        
            console.log('Top 3 Sales (Aggregation):', topSales);
            return topSales;
          } catch (err) {
            console.error('Error fetching top 3 sales with aggregation:', err);
            throw err;
          }
        }
}