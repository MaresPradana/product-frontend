<template>
  <div>
    <nav class="bg-slate-100 p-4">
      <div class="container mx-auto flex items-center justify-between">
        <a href="/" class="text-dark text-2xl font-bold">Demo</a>

        <!-- Menu Toggle Button for Mobile -->
        <div class="lg:hidden ml-auto">
          <button @click="toggleMenu" class="text-dark focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- (Desktop) -->
        <div class="flex items-center space-x-4">
          <div class="hidden lg:flex lg:items-center">
            <a href="/" class="text-dark px-4 py-2">Home</a>
          </div>

          <!-- Create Product Button (Desktop) -->
          <div class="hidden lg:flex lg:items-center">
            <a href="/create" class="bg-green-500 text-white px-7 py-2 rounded hover:bg-green-600 transition-colors rounded-full">
              Create Product
            </a>
          </div>  
        </div>

        <!-- Dropdown Menu on Mobile -->
        <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="lg:hidden absolute bg-slate-100 top-16 left-0 w-full p-4 shadow-lg">
          <a href="/" class="text-dark px-4 py-2 block">Home</a>

          <!-- Create Product Button in Dropdown for Mobile -->
          <a href="/create" class="bg-green-500 text-white text-center py-2 block rounded-full hover:bg-green-600 transition-colors mt-4">
            Create Product
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        isMenuOpen: false, // state for mobile menu toggle
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
</script>
  
<style scoped>
  /* Optional custom styles */
</style>
  