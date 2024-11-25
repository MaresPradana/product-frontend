<template>
  <div>
    <h1>Welcome to the Product Management App</h1>
    <p>Here you can manage your products</p>
    <ProductList />
  </div>
</template>

<script>
import ProductList from '../components/ProductList';

export default {
  name: 'HomePage',
  components: {
    ProductList
  }
};
</script>

<style scoped>
</style>
