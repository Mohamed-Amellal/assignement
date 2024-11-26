<template>
  <div class="top-selling-products-view">
    <h1>Top Selling Products</h1>
    <TopSellingProducts :timePeriod="'30d'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopSellingProducts from '../components/TopSellingProducts.vue';

export default defineComponent({
  name: 'TopSellingProductsView',
  components: {
    TopSellingProducts
  }
});
</script>

<style scoped>
.top-selling-products-view {
  padding: 20px;
}
</style>
