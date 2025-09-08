<template>
  <section class="max-w-2xl mx-auto px-4 py-16">
    <div
      class="card text-center"
      v-motion="{ initial: { opacity: 0, y: 12 }, enter: { opacity: 1, y: 0 } }"
    >
      <div
        class="mx-auto w-16 h-16 rounded-2xl bg-primary-green flex items-center justify-center text-primary-blue mb-4"
      >
        <svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor">
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-primary-blue mb-2">
        Thanks for signing up!
      </h2>
      <p class="text-neutral-dark2">
        We’ll review your request and schedule a container drop-off soon.
      </p>
      <router-link to="/" class="btn btn-secondary mt-6">Back</router-link>
    </div>
  </section>
</template>
<script setup>
// no script required
</script>
