<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Sales Dashboard</h1>
      <p class="welcome-message">Welcome, Admin!</p>
    </header>
    <TimeFilter @timePeriodChanged="handleTimePeriodChange" />
    <div class="dashboard-content">
      <TotalSales :timePeriod="selectedTimePeriod" />
      <TopSellingProducts :timePeriod="selectedTimePeriod" />
      <SalesByCategory :timePeriod="selectedTimePeriod" />
      <ProductTable :timePeriod="selectedTimePeriod" />
    </div>
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
    const selectedTimePeriod = ref('7d'); 
    
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
  background-color: #f9f9f9;
  border-radius: 8px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-header h1 {
  font-size: 24px;
  color: #333;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.welcome-message {
  font-size: 18px;
  color: #666;
  margin-top: 10px;
}
</style>
