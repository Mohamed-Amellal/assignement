<template>
  <div class="sales-by-product p-5">
    <h2 class="text-2xl font-bold mb-5">Sales by Product</h2>
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
            text: 'Total Quantity Sold',
          },
        },
      },
    };

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/analytics/trending_products/all'); // Fetch data from backend
        const products = response.data.trendingProducts; // Set products with the response data
        console.log('Products:', products);

        // Prepare data for Chart.js
        const labels = products.map((product: any) => product.name);
        const data = products.map((product: any) => product.quantity);

        chartData.value = {
          labels: labels,
          datasets: [{
            label: 'Total Quantity Sold',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        };
      } catch (error) {
        console.error('Error fetching product sales data:', error);
      }
    });

    return {
      chartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
.sales-by-product {
  margin-bottom: 20px;
}

.sales-by-product canvas {
  width: 100% !important;
  height: auto !important;
}
</style>