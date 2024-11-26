<template>
  <div class="dashboard">
    <TimeFilter @timePeriodChanged="handleTimePeriodChange" />
    <TotalSales :timePeriod="selectedTimePeriod" />
    <TopSellingProducts :timePeriod="selectedTimePeriod" />
    <SalesByCategory :timePeriod="selectedTimePeriod" />
    <ProductTable :timePeriod="selectedTimePeriod" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TimeFilter from './TimeFilter.vue';
import TotalSales from './TotalSales.vue';
import TopSellingProducts from './TopSellingProducts.vue';
import SalesByCategory from './SalesByCategory.vue';
import ProductTable from './ProductTable.vue';

export default defineComponent({
  name: 'DashboardView',
  components: {
    TimeFilter,
    TotalSales,
    TopSellingProducts,
    SalesByCategory,
    ProductTable
  },
  setup() {
    const selectedTimePeriod = ref('7d'); // Default to "7 days"
    
    const handleTimePeriodChange = (timePeriod: string) => {
      selectedTimePeriod.value = timePeriod;
    };

    return {
      selectedTimePeriod,
      handleTimePeriodChange
    };
  }
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
