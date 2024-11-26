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

            <!-- Actions Column for Desktop -->
            <td class="py-2 px-4 text-right hidden lg:table-cell">
              <button 
                @click="editProduct(product)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded-full mr-2"
              >
                Edit
              </button>
              <button 
                @click="confirmDeleteProduct(product)" 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-5 rounded-full"
              >
                Delete
              </button>
            </td>

            <!-- Mobile Actions (Below the Row) -->
            <td class="py-2 px-4 text-right lg:hidden">
              <div class="flex justify-end gap-4">
                <button 
                  @click="editProduct(product)"
                  class="text-blue-500 hover:text-blue-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button 
                  @click="confirmDeleteProduct(product)" 
                  class="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
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
