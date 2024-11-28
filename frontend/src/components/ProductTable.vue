<template>
  <div class="product-table mb-5 p-5 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Products</h2>
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
            <td class="py-2 px-4 border-b">{{ product.Amount ? product.Amount.toFixed(2) : 'N/A' }} $</td>
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
    const displayedProducts = ref<any[]>([]);

    onMounted(async () => {
      try {
        const res = await axios.get('http://nestjs_app:3000/analytics/trending_products/all');
        const trendingProducts = res.data.trendingProducts;
        console.log('Trending Products:', trendingProducts);
        products.value = trendingProducts;
        displayedProducts.value = trendingProducts; 
        const response = await axios.get('http://nestjs_app:3000/products');
        for (let i = 0; i < products.value.length; i++) {
          const resp = await axios.get('http://nestjs_app:3000/sales/' + response.data.products[i].ProductID);
          products.value[i].Date = resp.data.sale[0].Date;

          products.value[i].quantity = res.data.trendingProducts[i].Quantity;
          
          response.data.products.forEach((product: { ProductName: string; price: number }, index: number) => {
            const matchingProduct = products.value.find((p) => p.name === product.ProductName);
            if (matchingProduct) {
              products.value[i].price = response.data.products[i].Price;
            }
          });
          products.value[i].Amount = products.value[i].price * products.value[i].Quantity || 0;
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    });

    return {
      products,
      displayedProducts,
    };
  }
});
</script>

<style scoped>
.product-table {
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

.product-table table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th, .product-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.product-table th {
  background-color: #f8f9fa;
}

.product-table tr:hover {
  background-color: #f1f1f1;
}

.bg-white {
  background-color: #ffffff;
}

.p-5 {
  padding: 1.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
</style>


