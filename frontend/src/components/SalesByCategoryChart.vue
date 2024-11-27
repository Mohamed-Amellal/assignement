<template>
  <div>
    <h2>Sales Distribution by Category</h2>
    <div>
      <Bar :data="chartData" :options="chartOptions" v-if="chartData"/>
      <Pie :data="chartData" :options="chartOptions" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, ArcElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, ArcElement);

export default defineComponent({
  name: 'SalesByCategoryChart',
  components: {
    Bar,
    Pie,
  },
  setup() {
    const chartData = ref<any>(null);

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: 1000 || {}, 
          },
        },
      },
    };

    const fetchSalesByCategory = async () => {
      try {
        const response = await axios.get('/api/sales/category-distribution');
        chartData.value = {
          labels: 1000 || [],
        };
      } catch (err) {
        console.error('Error fetching sales by category:', err);
      }
    };

    onMounted(fetchSalesByCategory);

    return {
      chartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
