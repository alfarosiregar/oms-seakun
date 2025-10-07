<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="order in orders"
      :key="order.orderID"
      @click="$emit('open', order)"
      class="border border-gray-200 rounded-md p-4 cursor-pointer transition hover:shadow-md hover:border-green-500"
    >
      <div
        class="flex justify-between items-start mb-3 pb-3 border-b border-gray-100"
      >
        <div class="text-xs text-gray-600 font-medium">
          Order ID: {{ order.orderID }}
        </div>
        <div class="text-xs text-gray-400">
          Created at: {{ formatDate(order.createdAt) }}
        </div>
      </div>

      <div class="flex gap-6 flex-wrap">
        <div class="flex-1 min-w-[200px]">
          <div class="mb-1 text-sm text-gray-600">
            {{ order.customer?.name || "—" }}
          </div>
          <div class="mb-1 text-sm text-gray-600">
            {{ order.customer?.email || "—" }}
          </div>
          <div class="mb-1 text-sm text-gray-600">
            {{ order.customer?.phoneNumber || "—" }}
          </div>
        </div>

        <div class="flex-1 min-w-[200px]">
          <div class="text-xs text-gray-400 mb-1">Receiver</div>
          <div class="text-sm text-gray-800 mb-1">
            {{ order.provider?.name || "—" }}
          </div>
          <div class="text-xs text-gray-400 mb-1">Mobile</div>
          <div class="text-sm text-gray-800 mb-1">
            {{ order.provider?.package || "—" }}
          </div>
          <div class="text-xs text-gray-400 mb-1">Exp</div>
          <div class="text-sm text-gray-800 mb-1">
            {{ formatDate(order.provider?.expiredAt) }}
          </div>
        </div>

        <div
          class="text-lg font-semibold text-gray-800 text-right min-w-[120px] ml-auto"
        >
          {{ formatCurrency(order.provider?.price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  orders: { type: Array, default: () => [] },
});
defineEmits(["open"]);

function parseDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;
  const m = dateString.trim().match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (!m) return null;
  const day = +m[1],
    month = +m[2] - 1,
    year = +m[3];
  const d = new Date(year, month, day);
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day)
    return null;
  return d;
}
function formatDate(dateString) {
  const d = parseDate(dateString) || new Date(dateString);
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
</script>
