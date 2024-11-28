<template>
  <div class="sales-by-category p-5">
    <h2 class="text-2xl font-bold mb-5">Sales by Category</h2>
    <div class="bg-white p-5 rounded-lg shadow-md">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'SalesByCategory',
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  setup() {
    const products = ref<any[]>([]); 

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/analytics/category_sales');
        products.value = response.data.categorySales;
        const salesByCategory = products.value.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = 0;
          }
          acc[product.category] += product.total;
          return acc;
        }, {});

        const labels = Object.keys(salesByCategory);
        const data = Object.values(salesByCategory);

        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        new Chart(ctx, {
          type: 'bar', 
          data: {
            labels: labels,
            datasets: [{
              label: 'Sales by Category',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    });

    return {
      products
    };
  }
});
</script>

<style scoped>
.sales-by-category {
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

.sales-by-category canvas {
  width: 100% !important;
  height: auto !important;
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