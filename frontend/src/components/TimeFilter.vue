<template>
  <div class="time-filter">
    <label for="time-period">Select Time Period:</label>
    <select id="time-period" @change="handleChange">
      <option value="7d">Last 7 days</option>
      <option value="30d">Last 30 days</option>
      <option value="12m">Last 12 months</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TimeFilter',
  emits: ['timePeriodChanged'],
  setup(_, { emit }) {
    const handleChange = (event: Event) => {
      const value = (event.target as HTMLSelectElement).value;
      emit('timePeriodChanged', value);
    };

    return {
      handleChange
    };
  }
});
</script>

<style scoped>
.time-filter {
  margin-bottom: 20px;
}
</style>
