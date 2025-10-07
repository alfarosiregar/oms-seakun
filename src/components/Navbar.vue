<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm"
  >
    <nav class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/profile" class="flex items-center gap-3">
          <div
            class="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 grid place-items-center shadow"
          >
            <span class="text-white font-black text-lg">A</span>
          </div>
          <div class="leading-tight">
            <p class="font-semibold text-slate-900 dark:text-slate-100">
              Afdol Fahmul Rozi
            </p>
            <p
              class="text-[11px] tracking-wide text-slate-500 dark:text-slate-400"
            >
              Frontend Developer
            </p>
          </div>
        </RouterLink>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center gap-3">
          <li>
            <RouterLink
              to="/orders"
              class="px-3 py-2 text-sm font-medium bg-slate-900 hover:bg-slate-700 shadow text-white dark:text-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
              >Orders</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/profile"
              class="px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white hover:bg-slate-100 rounded-lg dark:text-slate-900 hover:opacity-90 transition"
              >Profile</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >Contact</RouterLink
            >
          </li>
        </ul>

        <!-- Mobile Toggle -->
        <button
          @click="toggleMenu"
          class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!open"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-slate-700 dark:text-slate-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-slate-700 dark:text-slate-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="open"
          class="md:hidden mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md p-3 space-y-1 mb-5"
        >
          <RouterLink
            to="/orders"
            class="block px-3 py-2 text-sm font-medium text-white dark:text-slate-200 dark:hover:bg-slate-700 rounded-lg bg-slate-900 hover:bg-slate-700"
            @click="closeMenu"
            >Orders</RouterLink
          >
          <RouterLink
            to="/profile"
            class="block px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-white dark:text-slate-900 hover:opacity-90 transition rounded-lg"
            @click="closeMenu"
            >Profile</RouterLink
          >
          <RouterLink
            to="/contact"
            class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            @click="closeMenu"
            >Contact</RouterLink
          >
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const open = ref(false);
const toggleMenu = () => (open.value = !open.value);
const closeMenu = () => (open.value = false);
</script>
