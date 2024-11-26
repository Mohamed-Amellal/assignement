<template>
  <div class="total-sales-view">
    <h1>Total Sales Overview</h1>
    <TotalSales :timePeriod="'30d'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TotalSales from '../components/TotalSales.vue';

export default defineComponent({
  name: 'TotalSalesView',
  components: {
    TotalSales
  }
});
</script>

<style scoped>
.total-sales-view {
  padding: 20px;
}
</style>
