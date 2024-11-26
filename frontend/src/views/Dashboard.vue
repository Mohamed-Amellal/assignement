<template>
  <div>
    <h1>Dashboard</h1>
    <SalesByCategoryChart />
    <SalesByProductChart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SalesByCategoryChart from '@/components/SalesByCategoryChart.vue';
import SalesByProductChart from '@/components/SalesByProductChart.vue';

export default defineComponent({
  name: 'DashboardView',
  components: {
    SalesByCategoryChart,
    SalesByProductChart,
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
