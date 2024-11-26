<template>
  <ProductForm :productId="productId" />
</template>

<script>
import ProductForm from '../components/ProductForm.vue';

export default {
  components: {
    ProductForm
  },
  data() {
    return {
      productId: this.$route.params.id,
    };
  },
};
</script>
