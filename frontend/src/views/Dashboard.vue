<template>
  <div id="app" class="h-full">
    <div class="flex flex-col min-h-screen">
    <!-- Top Bar -->
    <div class="top-bar bg-black text-white w-full p-5 flex items-center">
      <h1 class="text-2xl font-bold">Dashboard</h1>
    </div>
    <div class="flex flex-1">
      <!-- Sidebar -->
      <div class="sidebar bg-black text-white w-64 p-5">
        <ul class="route-list list-none p-0 flex flex-col">
          <li class="my-2">
            <router-link class="text-teal-500 text-lg hover:text-gray-400" to="/sales-by-category">Sales By Category</router-link>
          </li>
          <li class="my-2">
            <router-link class="text-teal-500 text-lg hover:text-gray-400" to="/sales-by-product">Sales By Product</router-link>
          </li>
          <li class="my-2">
            <router-link class="text-teal-500 text-lg hover:text-gray-400" to="/product-table">Product Table</router-link>
          </li>
          <li class="my-2">
            <router-link class="text-teal-500 text-lg hover:text-gray-400" to="/total-sales">Total Sales</router-link>
          </li>
          <li class="my-2">
            <router-link class="text-teal-500 text-lg hover:text-gray-400" to="/time-filter">Time Filter</router-link>
          </li>
          <li class="my-2">
            <router-link class="text-teal-500 text-lg hover:text-gray-400" to="/top-selling-products">Top Selling Products</router-link>
          </li>
        </ul>
      </div>
      <!-- Main Content -->
      <div class="flex-1 p-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
/* eslint-disable */
export default defineComponent({
  name: 'Dashboard',
});
</script>

<style scoped>
/* No custom styles needed as we are using Tailwind CSS */
</style>