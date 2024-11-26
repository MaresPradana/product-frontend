<template>
  <div id="app">
    <header>
      <h1>Product Management</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/create">Add New Product</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <!-- Reusable Component -->
    <app-alert></app-alert>

    <footer>
      <p>&copy; 2024 | Mares Pradana | Product Management with Vue.js</p>
    </footer>
  </div>
</template>

<script>
import AppAlert from './components/reusable/AppAlert.vue';

export default {
  name: "App",
  components: {
    AppAlert
  }
};
</script>

<style scoped>
/* Gaya untuk aplikasi */
#app {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  text-align: center;
}

nav {
  margin-top: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

nav a:hover {
  text-decoration: underline;
}

footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 10px;
  margin-top: auto;
}

main {
  flex: 1;
  padding: 20px;
}
</style>
