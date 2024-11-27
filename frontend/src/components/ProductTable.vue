<template>
  <div class="product-table mb-5">
    <h2 class="text-2xl font-bold mb-4">Products</h2>
    <div class="mb-4">
      <label for="date-filter" class="mr-2">Filter by Date:</label>
      <select id="date-filter" v-model="selectedFilter" @change="filterProducts" class="border rounded px-2 py-1">
        <option value="all">All</option>
        <option value="7days">Last 7 Days</option>
        <option value="1month">Last 1 Month</option>
        <option value="12months">Last 12 Months</option>
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Product Name</th>
            <th class="py-2 px-4 border-b">Date Added</th>
            <th class="py-2 px-4 border-b">Price</th>
            <th class="py-2 px-4 border-b">Total Sales : Quantity</th>
            <th class="py-2 px-4 border-b">Total Sales: Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in displayedProducts" :key="product.id" class="hover:bg-gray-100">
            <td class="py-2 px-4 border-b">{{ product.name }}</td>
            <td class="py-2 px-4 border-b">{{ product.Date }}</td>
            <td class="py-2 px-4 border-b">{{ product.price }}</td>
            <td class="py-2 px-4 border-b">{{ product.quantity }}</td>
            <td class="py-2 px-4 border-b">{{ product.Amount ? product.Amount.toFixed(2) : 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'ProductTable',
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  setup() {
    const products = ref<any[]>([]);
    const selectedFilter = ref('all');
    const displayedProducts = ref<any[]>([]);

    const filterProducts = () => {
      const now = new Date();
      if (selectedFilter.value === '7days') {
        const pastDate = new Date(now.setDate(now.getDate() - 7));
        displayedProducts.value = products.value.filter(product => new Date(product.Date) >= pastDate);
      } else if (selectedFilter.value === '1month') {
        const pastDate = new Date(now.setMonth(now.getMonth() - 1));
        displayedProducts.value = products.value.filter(product => new Date(product.Date) >= pastDate);
      } else if (selectedFilter.value === '12months') {
        const pastDate = new Date(now.setFullYear(now.getFullYear() - 1));
        displayedProducts.value = products.value.filter(product => new Date(product.Date) >= pastDate);
      } else {
        displayedProducts.value = products.value;
      }
    };

    onMounted(async () => {
      try {
        const res = await axios.get('http://localhost:3000/analytics/trending_products/all');
        const trendingProducts = res.data.trendingProducts;
        products.value = trendingProducts;
        displayedProducts.value = trendingProducts; // Show all products initially
        const response = await axios.get('http://localhost:3000/products');
        for (let i = 0; i < products.value.length; i++) {
          const resp = await axios.get('http://localhost:3000/sales/' + response.data.products[i].ProductID);
          // chekc if date big that date before
          products.value[i].Date = resp.data.sales[0].Date;
          products.value[i].quantity = resp.data.sales[0].quantity;
          
          response.data.products.forEach((product: { ProductName: string; price: number }, index: number) => {
            const matchingProduct = products.value.find((p) => p.name === product.ProductName);
            if (matchingProduct) {
              products.value[i].price = response.data.products[i].Price;
            }
          });
          products.value[i].Amount = products.value[i].price * products.value[i].quantity || 0;
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    });

    return {
      products,
      selectedFilter,
      displayedProducts,
      filterProducts
    };
  }
});
</script>

<style scoped>
/* Remove existing styles as Tailwind CSS will be used */
</style>
