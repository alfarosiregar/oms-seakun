<template>
  <footer
    class="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <!-- Logo -->
      <div class="flex flex-col items-center text-center gap-2">
        <div
          class="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center shadow"
        >
          <span class="text-white font-black">A</span>
        </div>
        <p class="font-semibold text-slate-900 dark:text-slate-100">
          {{ name }}
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ title }}
        </p>
      </div>

      <!-- Copyright -->
      <div class="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
        © {{ year }} {{ name }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: "Afdol Fahmul Rozi" },
  title: { type: String, default: "Frontend Developer" },
});
const year = new Date().getFullYear();
</script>
