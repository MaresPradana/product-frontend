import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CreateProduct from '../views/CreateProduct.vue';
import EditProduct from '../views/EditProduct.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/create',
    name: 'createProduct',
    component: CreateProduct,
  },
  {
    path: '/edit/:id',
    name: 'editProduct',
    component: EditProduct,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
