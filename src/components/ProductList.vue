<template>
  <div class="container mx-auto px-4 py-8 rounded-lg shadow-md">
    <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Product List</h1>
    
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-2 px-4 text-left">Name</th>
            <th class="py-2 px-4 text-left">Price</th>
            <th class="py-2 px-4 text-left">Stock</th>
            <th class="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b hover:bg-gray-100">
            <td class="py-2 px-4">{{ product.name }}</td>
            <td class="py-2 px-4">{{ product.price }}</td>
            <td class="py-2 px-4">{{ product.stock }}</td>
            <td class="py-2 px-4 text-right">
              <button 
                @click="editProduct(product)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Edit
              </button>
              <button 
                @click="confirmDeleteProduct(product)" 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ConfirmDelete modal -->
  <ConfirmDelete @confirm-delete="deleteProduct" />
</template>

<script>
import axios from '../axios';
import ConfirmDelete from './reusable/ConfirmDelete.vue';

export default {
  components: {
    ConfirmDelete
  },
  data() {
    return {
      products: [],
      deletedProductID: null
    };
  },
  methods: {
    fetchProducts() {
      axios.get('products/')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the products:", error);
          this.$store.dispatch('triggerAlert', {
            title: 'Error',
            message: 'There was an error when fetching the products.',
            type: 'error'
          });
        });
    },
    confirmDeleteProduct(product) {
      // Store the product to be deleted
      this.deletedProductID = product.id;

      // Trigger the confirmation modal
      this.$store.dispatch('triggerConfirmDelete', {
        title: 'Delete Product',
        message: `Are you sure you want to delete the product "${product.name}"?`
      });
    },
    async deleteProduct() {
      if (!this.deletedProductID) return;

      axios.delete(`products/${this.deletedProductID}/`)
        .then(() => {
          this.$store.dispatch('triggerAlert', {
            title: 'Success',
            message: 'Product has been deleted successfully.',
            type: 'success'
          });
          this.deletedProductID = null;
          this.fetchProducts();
        })
        .catch(error => {
          console.error("There was an error deleting the products:", error);
          this.$store.dispatch('triggerAlert', {
            title: 'Error',
            message: 'Failed to delete the product.',
            type: 'error'
          });
        });
    },
    editProduct(product) {
      this.$router.push({ name: 'editProduct', params: { id: product.id } });
    }
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
