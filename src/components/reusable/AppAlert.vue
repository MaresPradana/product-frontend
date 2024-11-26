<template>
  <div v-if="alert.show" :class="alertClasses" class="fixed bottom-4 right-4 max-w-xs px-4 py-3 rounded-lg shadow-lg" role="alert">
    <div class="flex flex-col">
      <strong class="font-bold">{{ alert.title }}</strong>
      <span class="block sm:inline">{{ alert.message }}</span>
    </div>
    <span @click="closeAlert" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
      <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a.5.5 0 10-.707-.707L10 8.586 6.36 4.945a.5.5 0 10-.707.707L9.293 10l-3.64 3.64a.5.5 0 00.707.707L10 11.414l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64z"/></svg>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    alert() {
      console.log(this.$store.state.alert);
      return this.$store.state.alert;
    },
    alertClasses() {
      const { type } = this.alert;
      if (type === 'success') {
        return 'bg-green-100 border border-green-400 text-green-700';
      } else if (type === 'error') {
        return 'bg-red-100 border border-red-400 text-red-700';
      } else {
        return 'bg-gray-100 border border-gray-400 text-gray-700'; // Default style
      }
    }
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('hideAlert');
    }
  }
};
</script>
