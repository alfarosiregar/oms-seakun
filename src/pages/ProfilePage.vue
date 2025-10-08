<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div
      class="h-40 w-full bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl"
    ></div>
    <section class="max-w-3xl mx-auto px-4 -mt-20 pb-12">
      <div
        class="rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-xl"
      >
        <div class="p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              :src="profile.photoUrl"
              alt="Profile"
              class="h-28 w-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
            />
            <div class="flex-1">
              <h1
                class="text-3xl font-semibold text-slate-900 dark:text-slate-50"
              >
                {{ profile.name }}
              </h1>
              <p class="mt-1 text-slate-600 dark:text-slate-300">
                {{ profile.title }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="(t, i) in profile.tags"
                  :key="i"
                  class="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >{{ t }}</span
                >
              </div>
            </div>
            <div class="flex items-center gap-2">
              <a
                :href="profile.cvUrl"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90"
                >Download CV</a
              >
              <a
                :href="`/contact`"
                class="px-4 py-2 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >Contact</a
              >
            </div>
          </div>

          <p class="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed">
            {{ profile.bio }}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              <!-- ikon -->
              <component :is="s.icon" class="w-4 h-4" aria-hidden="true" />
              <span>{{ s.label }}</span>
            </a>
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-700"
        >
          <div class="p-6">
            <p class="text-xs tracking-wider text-slate-500">Location</p>
            <p class="mt-1 text-slate-800 dark:text-slate-200">
              {{ profile.location }}
            </p>
          </div>
          <div class="p-6">
            <p class="text-xs tracking-wider text-slate-500">Focus</p>
            <p class="mt-1 text-slate-800 dark:text-slate-200">
              {{ profile.focus }}
            </p>
          </div>
          <div class="p-6">
            <p class="text-xs tracking-wider text-slate-500">Open to</p>
            <p class="mt-1 text-slate-800 dark:text-slate-200">
              {{ profile.openTo }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { Github, Linkedin, Instagram, Globe } from "lucide-vue-next";

const profile = reactive({
  name: "Afdol Fahmul Rozi",
  title:
    "Fresh Graduate in Computer Science (UNIMED) Front-End Developer Enthusiast",
  tags: ["React/Next.js", "TypeScript", "Tailwind", "Cloud Computing"],
  bio: "Fresh Graduate Ilmu Komputer UNIMED. Berfokus pada pengembangan front-end modern menggunakan React, TypeScript, dan Tailwind, dengan keahlian integrasi API, optimasi performa, serta deployment di AWS.",
  photoUrl: "/img/my-photo.png",
  cvUrl:
    "https://drive.google.com/uc?export=download&id=1Zlcuc7mh70THMSHPxQkN_KgDakGks1ew",
  email: "afdolfarosir19@gmail.com",
  location: "Medan, Indonesia",
  focus: "Front-End Development, UI Performance",
  openTo: "Full-time",
  social: {
    github: "https://github.com/alfarosiregar",
    linkedin: "https://www.linkedin.com/in/alfarosiregar",
    instagram: "https://www.instagram.com/alfazisiregar/",
    website: "https://alfarosiregar.online/",
  },
});

const socials = computed(() => [
  { label: "GitHub", href: profile.social.github, icon: Github },
  { label: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
  { label: "Instagram", href: profile.social.instagram, icon: Instagram },
  { label: "Website", href: profile.social.website, icon: Globe },
]);
</script>
