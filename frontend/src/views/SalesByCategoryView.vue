<template>
  <div class="sales-by-category-view">
    <h1>Sales by Category</h1>
    <SalesByCategory :timePeriod="'30d'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SalesByCategory from '../components/SalesByCategory.vue';

export default defineComponent({
  name: 'SalesByCategoryView',
  components: {
    SalesByCategory
  }
});
</script>

<style scoped>
.sales-by-category-view {
  padding: 20px;
}
</style>
