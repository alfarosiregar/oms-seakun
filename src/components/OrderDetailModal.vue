<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-6"
    @click.self="closeModal"
  >
    <!-- Modal -->
    <div
      class="bg-white rounded-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-xl"
    >
      <!-- Header -->
      <div class="px-6 py-5 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Order Detail</h2>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Section: Order meta -->
        <div class="mb-6">
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Order ID</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.orderID
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Created at</span>
            <span class="text-sm text-gray-800 text-right">{{
              formatDate(order.createdAt)
            }}</span>
          </div>
        </div>

        <!-- Section: Customer -->
        <div class="mb-6">
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">User Name</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.customer?.name || "—"
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Email</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.customer?.email || "—"
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Phone</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.customer?.phoneNumber || "—"
            }}</span>
          </div>
        </div>

        <!-- Section: Provider -->
        <div class="mb-6">
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Receiver</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.provider?.name || "—"
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Mobile</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.provider?.package || "—"
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Expired Date</span>
            <span class="text-sm text-gray-800 text-right">{{
              formatDate(order.provider?.expiredAt)
            }}</span>
          </div>
        </div>

        <!-- Section: Payment -->
        <div class="mb-0">
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Price</span>
            <span class="text-sm text-gray-800 text-right">{{
              formatCurrency(order.provider?.price)
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium"
              >Recipient Code</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              order.payment?.voucher || "—"
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium"
              >Payment Status</span
            >
            <span class="text-sm text-gray-800 text-right">{{
              order.payment?.status || "—"
            }}</span>
          </div>
          <div
            class="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span class="text-sm text-gray-600 font-medium">Payment Date</span>
            <span class="text-sm text-gray-800 text-right">{{
              formatDate(order.payment?.date)
            }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-gray-600 font-medium">Payment Bank</span>
            <span class="text-sm text-gray-800 text-right">{{
              order.payment?.bank || "—"
            }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Okay
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  order: { type: Object, required: true },
});
const emit = defineEmits(["close"]);

function parseDDMMYYYY(input) {
  if (!input) return null;
  if (input instanceof Date) return isNaN(input) ? null : input;
  if (typeof input !== "string") return null;

  const m = input.trim().match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (!m) return null;

  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  const year = Number(m[3]);

  const d = new Date(year, month, day);
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day)
    return null;
  return d;
}

function formatDate(dateString) {
  const d = parseDDMMYYYY(dateString) || new Date(dateString);
  if (!(d instanceof Date) || isNaN(d)) return dateString ?? "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

function formatCurrency(amount) {
  const n = typeof amount === "number" ? amount : Number(amount ?? 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function closeModal() {
  emit("close");
}
</script>
