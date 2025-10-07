<template>
  <div
    class="flex items-center justify-center min-h-[80vh] bg-slate-50 dark:bg-slate-900"
  >
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-sm w-full text-center border border-slate-200 dark:border-slate-700"
    >
      <!-- Header -->
      <h1
        class="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6"
      >
        Contact Me
      </h1>

      <!-- Contact Info -->
      <div class="space-y-4">
        <!-- Email -->
        <div
          class="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-xl p-3 hover:shadow-md transition"
        >
          <MailIcon class="w-5 h-5 text-green-600" />
          <a
            href="mailto:afdolfarosir19@gmail.com"
            class="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            afdolfarosir19@gmail.com
          </a>
        </div>

        <!-- Phone -->
        <div
          class="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-xl p-3 hover:shadow-md transition"
        >
          <PhoneIcon class="w-5 h-5 text-green-600" />
          <a
            href="tel:+6285183379033"
            class="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            +62 85183379033
          </a>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-6">
        Feel free to reach out for collaboration or opportunities 🤝
      </p>
    </div>
  </div>
</template>

<script setup>
import { MailIcon, PhoneIcon } from "lucide-vue-next";
</script>
