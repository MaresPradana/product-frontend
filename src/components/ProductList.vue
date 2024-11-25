<template>
  <div>
    <h1>Product List</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button @click="editProduct(product)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      products: [],
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
        });
    },
    deleteProduct(id) {
      axios.delete(`products/${id}/`)
        .then(() => {
          this.fetchProducts();
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
