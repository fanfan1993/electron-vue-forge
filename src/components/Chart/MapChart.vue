<script setup lang="ts">
import { ref } from "vue";

const chartOptions = ref({
  series: [
    {
      data: Array.from({ length: 200 }, () => Math.floor(Math.random() * 10)),
    },
  ],
});
</script>

<template>
  <div class="chart">
    <h2 class="green">StockChart</h2>
    <highcharts class="highcharts" :options="chartOptions" :constructor-type="'stockChart'"></highcharts>
  </div>
</template>