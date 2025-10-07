import { createRouter, createWebHistory } from "vue-router";
import OrdersPage from "@/pages/OrdersPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/orders" },
    { path: "/orders", component: OrdersPage },
    { path: "/contact", component: ContactPage },
    { path: "/profile", component: ProfilePage },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
