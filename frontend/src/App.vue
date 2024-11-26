<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from './views/Dashboard.vue';

export default defineComponent({
  name: 'App',
  components: {
    Dashboard,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
