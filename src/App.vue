<template>
  <div id="app">
    <header>
      <app-navigation></app-navigation>
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
import AppNavigation from './components/reusable/AppNavigation.vue';
import AppAlert from './components/reusable/AppAlert.vue';

export default {
  name: "App",
  components: {
    AppNavigation,
    AppAlert
  }
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
