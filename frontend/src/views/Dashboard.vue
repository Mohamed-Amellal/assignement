<template>
  <div id="app" class="h-full">
    <div class="flex flex-col min-h-screen">
      <!-- Top Bar -->
      <div class="top-bar bg-gradient-to-r from-purple-500 to-indigo-500 text-white w-full p-5 flex items-center justify-between shadow-lg">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="welcome-message">Welcome, Admin!</p>
      </div>
      <div class="flex flex-1">
        <!-- Sidebar -->
        <div class="sidebar bg-gray-900 text-white w-64 p-5 shadow-lg">
          <ul class="route-list list-none p-0 flex flex-col">
            <li class="my-2">
              <router-link class="sidebar-link" to="/sales-by-category">Sales By Category</router-link>
            </li>
            <li class="my-2">
              <router-link class="sidebar-link" to="/sales-by-product">Sales By Product</router-link>
            </li>
            <li class="my-2">
              <router-link class="sidebar-link" to="/">Product Table</router-link>
            </li>
          </ul>
        </div>
        <!-- Main Content -->
        <div class="flex-1 p-5 bg-gray-100">
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
.top-bar {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sidebar {
  background: #2d3748;
  padding: 20px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
.route-list li {
  margin-bottom: 10px;
}
.sidebar-link {
  display: block;
  padding: 10px 15px;
  color: #81e6d9;
  background-color: #1a202c;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.3s;
}
.sidebar-link:hover {
  background-color: #4a5568;
  transform: scale(1.05);
}
.welcome-message {
  font-size: 18px;
  color: #e2e8f0;
}
</style>