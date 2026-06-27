"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/dataService";
import { Save } from "lucide-react";

const nextStatuses = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const statusLabels = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export default function OrderStatusUpdater({ orderId, currentStatus }) {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  const allowedStatuses = nextStatuses[currentStatus] || [];

  const handleUpdate = async () => {
    if (!newStatus || newStatus === currentStatus) return;
    try {
      setSaving(true);
      await updateOrderStatus(orderId, newStatus);
      window.location.reload();
    } catch (error) {
      alert("خطا در تغییر وضعیت: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (allowedStatuses.length === 0) {
    return (
      <p className="text-sm text-gray-500">این سفارش قابل تغییر وضعیت نیست</p>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        تغییر وضعیت
      </label>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      >
        <option value={currentStatus} disabled>
          انتخاب کنید
        </option>
        {allowedStatuses.map((status) => (
          <option key={status} value={status}>
            {statusLabels[status]}
          </option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={saving || newStatus === currentStatus}
        className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}
