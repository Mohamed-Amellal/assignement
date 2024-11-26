<template>
  <div class="top-selling-products">
    <h2>Top Selling Products</h2>
    <ul>
      <li v-for="product in topProducts" :key="product.id">
        {{ product.name }} - {{ product.quantitySold }} sold
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'TopSellingProducts',
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const topProducts = computed(() => {
      // Fetch the top-selling products based on the time period
      // Mock data for now
      return [
        { id: 1, name: 'Product 1', quantitySold: 150 },
        { id: 2, name: 'Product 2', quantitySold: 120 },
        { id: 3, name: 'Product 3', quantitySold: 110 }
      ];
    });

    return {
      topProducts
    };
  }
});
</script>

<style scoped>
.top-selling-products {
  margin-bottom: 20px;
}
</style>
