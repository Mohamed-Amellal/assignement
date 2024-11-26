<template>
  <div class="dashboard-view">
    <h1>Dashboard</h1>
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from '../components/Dashboard.vue';

export default defineComponent({
  name: 'DashboardView',
  components: {
    Dashboard
  }
});
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
}
</style>
