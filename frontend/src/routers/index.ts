import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import TotalSalesView from '../views/TotalSalesView.vue';
import TopSellingProductsView from '../views/TopSellingProductsView.vue';
import SalesByCategoryView from '../views/SalesByCategoryView.vue';
import ProductTableView from '../views/ProductTableView.vue';

const routes = [
  { path: '/dashboard', component: DashboardView },
  { path: '/total-sales', component: TotalSalesView },
  { path: '/top-selling-products', component: TopSellingProductsView },
  { path: '/sales-by-category', component: SalesByCategoryView },
  { path: '/product-table', component: ProductTableView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
