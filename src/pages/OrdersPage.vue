<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <h1 class="text-2xl font-semibold text-gray-800">Order List</h1>

      <div
        class="flex gap-3 items-center flex-wrap w-full md:w-auto md:flex-1 md:justify-end"
      >
        <div class="flex items-center gap-2 w-full md:w-auto">
          <input
            v-model.trim="searchQuery"
            type="text"
            placeholder="Search by name / email / order id"
            @keyup.enter="resetToFirstPage"
            class="px-3 py-2 border border-gray-300 rounded text-sm min-w-[220px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-auto"
          />
          <button
            @click="resetToFirstPage"
            class="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        </div>

        <select
          v-model="sortOrder"
          @change="resetToFirstPage"
          class="block w-36 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
          aria-label="Sort by date"
        >
          <option value="asc">Date: Oldest first</option>
          <option value="desc">Date: Newest first</option>
        </select>
      </div>
    </div>

    <!-- States -->
    <div v-if="loading" class="text-center py-12 text-gray-600">
      Loading orders...
    </div>
    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>
    <div
      v-else-if="paginatedOrders.length === 0"
      class="text-center py-12 text-gray-400"
    >
      No orders found
    </div>

    <!-- List -->
    <div v-else>
      <OrderList :orders="paginatedOrders" @open="openOrderDetail" />

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2 mt-6">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 border border-gray-300 bg-white rounded text-sm hover:bg-gray-50 hover:border-green-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1.5 border bg-white rounded text-sm hover:bg-green-600 hover:text-white hover:border-green-500',
            page === currentPage
              ? 'border-green-600 text-gray-800'
              : 'border-gray-300',
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 border border-gray-300 bg-white rounded text-sm hover:bg-gray-50 hover:border-green-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

        <div class="text-sm text-gray-600 mx-2">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
      </div>
    </div>

    <OrderDetailModal
      v-if="selectedOrder"
      :order="selectedOrder"
      @close="closeOrderDetail"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import OrderList from "@/components/OrderList.vue";
import OrderDetailModal from "@/components/OrderDetailModal.vue";
import { fetchOrders } from "@/services/api.js";

/* ---------- State ---------- */
const orders = ref([]);
const loading = ref(true);
const error = ref("");

const searchQuery = ref("");
const sortOrder = ref("asc");
const currentPage = ref(1);
const itemsPerPage = 5;
const selectedOrder = ref(null);

/* ---------- Utils ---------- */
function parseDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;
  const m = dateString.trim().match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (!m) {
    const d2 = new Date(dateString);
    return isNaN(d2) ? null : d2;
  }
  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  const year = Number(m[3]);
  const d = new Date(year, month, day);
  return d.getFullYear() === year &&
    d.getMonth() === month &&
    d.getDate() === day
    ? d
    : null;
}

/* ---------- Computed ---------- */
const filteredOrders = computed(() => {
  const src = Array.isArray(orders.value) ? orders.value : [];
  const q = (searchQuery.value || "").toLowerCase();

  let result = q
    ? src.filter(
        (o) =>
          (o?.customer?.name || "").toLowerCase().includes(q) ||
          (o?.customer?.email || "").toLowerCase().includes(q) ||
          String(o?.orderID ?? "")
            .toLowerCase()
            .includes(q)
      )
    : [...src];

  if (sortOrder.value === "asc" || sortOrder.value === "desc") {
    result.sort((a, b) => {
      const da = parseDate(a?.createdAt) || 0;
      const db = parseDate(b?.createdAt) || 0;
      return sortOrder.value === "asc" ? da - db : db - da;
    });
  }
  return result;
});

const totalPages = computed(() => {
  const count = filteredOrders.value.length;
  return Math.max(1, Math.ceil(count / itemsPerPage) || 1);
});

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredOrders.value.slice(start, start + itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const max = 5;
  let start = Math.max(1, currentPage.value - Math.floor(max / 2));
  let end = Math.min(total, start + max - 1);
  if (end - start < max - 1) start = Math.max(1, end - max + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

/* ---------- Actions ---------- */
function resetToFirstPage() {
  currentPage.value = 1;
}
function goToPage(p) {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p;
}
function openOrderDetail(order) {
  selectedOrder.value = order;
}
function closeOrderDetail() {
  selectedOrder.value = null;
}

/* ---------- Effects ---------- */
watch(filteredOrders, () => {
  if (currentPage.value > totalPages.value) currentPage.value = 1;
});

onMounted(async () => {
  try {
    loading.value = true;
    const data = await fetchOrders();
    orders.value = Array.isArray(data) ? data : [];
  } catch (e) {
    console.error(e);
    error.value = "Failed to load orders. Please try again later.";
    orders.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
