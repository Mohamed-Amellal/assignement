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
            label: (context: any) => {
              return `${context.label}: $${context.raw}`;
            },
          },
        },
      },
    };

    // const fetchSalesByCategory = async () => {
    //   try {
    //     const response = await axios.get('/api/sales/category-distribution');
    //     chartData.value = {
    //       labels: response.data.map((item: any) => item.category),
    //       datasets: [
    //         {
    //           label: 'Sales Amount',
    //           data: response.data.map((item: any) => item.sales),
    //           backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33B8'],
    //           borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33B8'],
    //           borderWidth: 1,
    //         },
    //       ],
    //     };
    //   } catch (err) {
    //     console.error('Error fetching sales by category:', err);
    //   }
    // };

    // onMounted(fetchSalesByCategory);

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
