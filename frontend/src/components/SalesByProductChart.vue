<template>
  <div class="sales-by-product p-5">
    <!-- New Component for Top 5 Sales, Total Sales, and Total Earnings -->
    <div class="mb-5 top-sales">
      <h3 class="text-xl font-bold mb-3">Top 5 Sales</h3>
      <ul>
        <li v-for="(product, index) in top5Products" :key="index">
          {{ product.name }}: {{ product.Quantity }} units
        </li>
      </ul>
      <h3 class="text-xl font-bold mt-5">Total Sales: {{ totalSales }} units</h3>
      <h3 class="text-xl font-bold mt-2">Total Earnings: {{ totalEarnings }}$ </h3>
    </div>

    <h2 class="text-2xl font-bold mb-5">Sales by Product</h2>
    
    <!-- Date Range Filter -->
    <div class="mb-4">
      <button @click="setDateRange('7',7)" class="btn btn-primary mr-2">Last 7 Days</button>
      <button @click="setDateRange('30',30)" class="btn btn-primary mr-2">Last Month</button>
      <button @click="setDateRange('365',365)" class="btn btn-primary mr-2">Last 12 Months</button>
      <button @click="setDateRange('all',0)" class="btn btn-secondary">All Time</button> <!-- Default to all data -->
    </div>

    <div class="bg-white p-5 rounded-lg shadow-md">
      <Bar :data="chartData" :options="chartOptions" v-if="chartData"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: 'SalesByProductChart',
  components: {
    Bar,
  },
  setup() {
    const chartData = ref<any>(null);
    const dateRange = ref<string>('all'); // Default to 'all' (no filter, show all data)
    const dateRange_number = ref<number>(0);
    const top5Products = ref<any[]>([]);
    const totalSales = ref<number>(0);
    const totalEarnings = ref<number>(0);

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sales by Product',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Products',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Earnings',
          },
        },
      },
    };
/* eslint-disable */
    const formatDate = (date : Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const setDateRange = (range: string, rangeNumber: number) => {
      dateRange.value = range
      dateRange_number.value = new Date().getFullYear() - rangeNumber;
      fetchData();
    };

    const fetchData = async () => {
      console.log('Fetching data for date range:', dateRange.value);
      let apiUrl: string = '';
      let date: String = '';
      let pastDate: Date;
      let formattedPastDate: String;
      const now = new Date();
      try {
        switch (dateRange.value) {
        case '7':
            pastDate = now;
            pastDate.setDate(now.getDate() - 7); // Subtract 7 days
            formattedPastDate = formatDate(pastDate); // Format the date
          apiUrl = 'http://nestjs_app:3000/analytics/datefilter/'+formattedPastDate;
          break;
        case '30':
            pastDate = now;
            pastDate.setMonth(now.getMonth() - 1); // Subtract 1 month
            formattedPastDate = formatDate(pastDate); // Format the date
          apiUrl = 'http://nestjs_app:3000/analytics/datefilter/'+formattedPastDate;
          break;
        case '365':
            pastDate = new Date(now);
            pastDate.setFullYear(now.getFullYear() - 1); // Subtract 1 year
            formattedPastDate = formatDate(pastDate); // Format the date
          apiUrl = 'http://nestjs_app:3000/analytics/datefilter/'+formattedPastDate;
          break;
        case 'all':
        default:
          apiUrl = 'http://nestjs_app:3000/analytics/trending_products/all';
          break;
      }
      console.log('API URL:', apiUrl);
        const response = await axios.get(apiUrl); // Fetch data from backend');
        console.log('Products:', response.data.trendingProducts);
        const products = response.data.trendingProducts; // Set products with the response data

        // Prepare data for Chart.js
        const labels = products?.map((product: any) => product.name);
        const data = products?.map((product: any) => product.TotalAmount);

        chartData.value = {
          labels: labels,
          datasets: [{
            label: 'Total Earnings',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        };

        // Calculate top 5 products, total sales, and total earnings
        top5Products.value = products.slice(0, 5);
        totalSales.value = products.reduce((sum: number, product: any) => sum + product.Quantity, 0);
        totalEarnings.value = products.reduce((sum: number, product: any) => sum + product.TotalAmount, 0);
      } catch (error) {
        console.error('Error fetching product sales data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      chartData,
      chartOptions,
      setDateRange,
      top5Products,
      totalSales,
      totalEarnings,
    };
  },
});
</script>

<style scoped>
.sales-by-product {
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

.sales-by-product canvas {
  width: 100% !important;
  height: auto !important;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.top-sales {
  text-align: left;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.top-sales ul {
  list-style-type: none;
  padding: 0;
}

.top-sales li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.top-sales li:last-child {
  border-bottom: none;
}

.top-sales h3 {
  color: #343a40;
}

.bg-white {
  background-color: #ffffff;
}

.p-5 {
  padding: 1.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
