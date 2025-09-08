<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-primary-blue text-white">
      <div class="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
        <!-- Logo instead of U -->
        <img
          src="/src/assets/logo.png"
          alt="HomeBase Logo"
          class="w-9 h-9 object-contain rounded-xl bg-white p-1"
        />
        <h1 class="text-lg font-bold tracking-tight">HomeBase UCO</h1>
        <span class="ml-auto text-sm opacity-80">
          Residential Used Cooking Oil
        </span>
      </div>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-primary-blueShade text-white/80 mt-16">
      <div class="max-w-5xl mx-auto px-4 py-6 text-sm">
        © Neutral Fuels — Home Collection Initiative
      </div>
    </footer>
  </div>
</template>

<script setup>
// no script needed here
</script>
