<template>
  <div class="max-w-lg mx-auto md:my-10 bg-white py-8 px-4 md:p-8 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">{{ isEdit ? 'Edit Product' : 'Create Product' }}</h1>

    <form @submit.prevent="submitProduct" class="space-y-6">
      <!-- Product Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Product Name:</label>
        <input
          v-model="product.name"
          id="name"
          type="text"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Price -->
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
        <input
          v-model="product.price"
          id="price"
          type="number"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Stock -->
      <div>
        <label for="stock" class="block text-sm font-medium text-gray-700">Stock:</label>
        <input
          v-model="product.stock"
          id="stock"
          type="number"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
        <textarea
          v-model="product.description"
          id="description"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ isEdit ? 'Update Product' : 'Create Product' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from '../axios';
import { useStore } from 'vuex';

export default {
  name: 'ProductForm',
  props: {
    productId: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const store = useStore();

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
            store.dispatch('triggerAlert', {
              title: 'Success',
              message: 'Product has been update successfully.',
              type: 'success'
            });

            setTimeout(() => {
              window.location.href = '/';
            }, 1000);
          })
          .catch((error) => {
            console.error("There was an error update the products:", error);
            store.dispatch('triggerAlert', {
              title: 'Error',
              message: 'Failed to upate the product.',
              type: 'error'
            });
          });
      } else {
        // Jika create, lakukan penambahan produk
        axios.post('products/', product.value)
          .then(() => {
            store.dispatch('triggerAlert', {
              title: 'Success',
              message: 'Product has been submit successfully.',
              type: 'success'
            });

            setTimeout(() => {
              window.location.href = '/';
            }, 1000);
          })
          .catch((error) => {
            console.error("There was an error post the products:", error);
            store.dispatch('triggerAlert', {
              title: 'Error',
              message: 'Failed to submit the product.',
              type: 'error'
            });
          });
      }
    };

    const fetchProduct = () => {
      if (props.productId) {
        isEdit.value = true;
        axios.get(`products/${props.productId}/`)
          .then(response => {
            product.value = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the products:", error);
            store.dispatch('triggerAlert', {
              title: 'Error',
              message: 'There was an error when fetching the products.',
              type: 'error'
            });
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
