<template>
  <div>
    <h1>{{ isEdit ? 'Edit Product' : 'Create Product' }}</h1>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">Product Name:</label>
        <input v-model="product.name" id="name" type="text" required />
      </div>

      <div>
        <label for="price">Price:</label>
        <input v-model="product.price" id="price" type="number" required />
      </div>

      <div>
        <label for="stock">Stock:</label>
        <input v-model="product.stock" id="stock" type="number" required />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea v-model="product.description" id="description"></textarea>
      </div>

      <button type="submit">{{ isEdit ? 'Update Product' : 'Create Product' }}</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from '../axios';

export default {
  name: 'ProductForm',
  props: {
    productId: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const isEdit = ref(false);
    const product = ref({
      name: '',
      price: 0,
      stock: 0,
      description: '',
    });

    const submitProduct = () => {
      if (isEdit.value) {
        // Jika edit, lakukan update produk
        axios.put(`products/${product.value.id}/`, product.value)
          .then(() => {
            window.location.href = '/';
          });
      } else {
        // Jika create, lakukan penambahan produk
        axios.post('products/', product.value)
          .then(() => {
            window.location.href = '/';
          });
      }
    };

    const fetchProduct = () => {
      if (props.productId) {
        isEdit.value = true;
        axios.get(`products/${props.productId}/`)
          .then(response => {
            product.value = response.data;
          });
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      isEdit,
      product,
      submitProduct,
    };
  },
};
</script>
