<template>
  <div class="total-sales">
    <h2>Total Sales</h2>
    <p>{{ totalSales }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'TotalSales',
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const totalSales = computed(() => {
      // Fetch total sales data based on the time period
      // For now, let's return a mock value.
      return '$1000';  // Replace with actual calculation logic
    });

    return {
      totalSales
    };
  }
});
</script>

<style scoped>
.total-sales {
  margin-bottom: 20px;
}
</style>
