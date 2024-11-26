<template>
  <div>
    <h2>Sales by Product</h2>
    <Bar :data="chartData" :options="chartOptions" v-if="chartData"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale);

export default defineComponent({
  name: 'SalesByProductChart',
  components: {
    Bar,
  },
  setup() {
    const chartData = ref<any>(null);

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Product Name',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Sales Amount',
          },
        },
      },
    };

    // const fetchSalesByProduct = async () => {
    //   try {
    //     const response = await axios.get('/api/sales/product-sales');
    //     chartData.value = {
    //       labels: response.data.map((item: any) => item.product),
    //       datasets: [
    //         {
    //           label: 'Sales Amount',
    //           data: response.data.map((item: any) => item.sales),
    //           backgroundColor: '#4CAF50',
    //           borderColor: '#4CAF50',
    //           borderWidth: 1,
    //         },
    //       ],
    //     };
    //   } catch (err) {
    //     console.error('Error fetching sales by product:', err);
    //   }
    // };

    // onMounted(fetchSalesByProduct);

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
