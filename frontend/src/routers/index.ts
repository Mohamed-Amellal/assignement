import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import SalesByCategory from '@/components/SalesByCategory.vue';
// import SalesByProduct from '@/components/SalesByProduct.vue';
import ProductTable from '@/components/ProductTable.vue';
import TotalSales from '@/components/TotalSales.vue';
import TimeFilter from '@/components/TimeFilter.vue';
import TopSellingProducts from '@/components/TopSellingProducts.vue';
import SalesByProductChart from '@/components/SalesByProductChart.vue';

const routes = [
  // { path: '/', component: Dashboard },
  { path: '/sales-by-category', component: SalesByCategory },
  { path: '/sales-by-product', component: SalesByProductChart },
  { path: '/product-table', component: ProductTable },
  { path: '/total-sales', component: TotalSales },
  { path: '/time-filter', component: TimeFilter },
  { path: '/top-selling-products', component: TopSellingProducts },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;