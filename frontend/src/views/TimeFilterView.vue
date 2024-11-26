<template>
  <div class="time-filter-view">
    <h1>Select Time Period</h1>
    <TimeFilter @timePeriodChanged="handleTimePeriodChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeFilter from '../components/TimeFilter.vue';

export default defineComponent({
  name: 'TimeFilterView',
  components: {
    TimeFilter
  },
  setup() {
    const handleTimePeriodChange = (timePeriod: string) => {
      console.log('Selected Time Period:', timePeriod);
    };

    return {
      handleTimePeriodChange
    };
  }
});
</script>

<style scoped>
.time-filter-view {
  padding: 20px;
}
</style>
