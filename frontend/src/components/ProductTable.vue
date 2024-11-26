<template>
  <div class="product-table">
    <h2>Products</h2>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Date Added</th>
          <th>Price</th>
          <th>Total Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.dateAdded }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.totalSales }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ProductTable',
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const products = computed(() => {
      // Fetch product data based on the time period
      // Mock data for now
      return [
        { id: 1, name: 'Product 1', dateAdded: '2024-01-01', price: 100, totalSales: 150 },
        { id: 2, name: 'Product 2', dateAdded: '2024-02-01', price: 200, totalSales: 120 }
      ];
    });

    return {
      products
    };
  }
});
</script>

<style scoped>
.product-table {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
