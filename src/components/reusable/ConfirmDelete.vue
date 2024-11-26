<template>
  <div v-if="confirmDelete.show" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h3 class="text-xl font-semibold mb-4">{{ confirmDelete.title }}</h3>
      <p class="mb-4">{{ confirmDelete.message }}</p>

      <div class="flex justify-end space-x-4">
        <button @click="cancelDelete" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
        <button @click="confirmDeleteAction" class="px-4 py-2 bg-red-600 text-white rounded">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    confirmDelete() {
      return this.$store.state.confirmDelete;
    }
  },
  methods: {
    cancelDelete() {
      this.$store.dispatch('hideConfirmDelete');
    },
    confirmDeleteAction() {
      // Emit event to trigger action in the parent component
      this.$emit('confirm-delete');
      this.$store.dispatch('hideConfirmDelete');
    }
  }
};
</script>
