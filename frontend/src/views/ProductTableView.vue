<template>
  <div class="product-table-view">
    <h1>Product Table</h1>
    <ProductTable :timePeriod="'30d'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductTable from '../components/ProductTable.vue';

export default defineComponent({
  name: 'ProductTableView',
  components: {
    ProductTable
  }
});
</script>

<style scoped>
.product-table-view {
  padding: 20px;
}
</style>
