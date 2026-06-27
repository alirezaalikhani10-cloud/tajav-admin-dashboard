"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default function DashboardContent({
  totalProducts,
  totalOrders,
  pendingOrders,
  totalRevenue,
  chartData,
  recentOrders,
}) {
  const cards = [
    {
      label: "محصولات",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "سفارش‌های باز",
      value: pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "کل سفارش‌ها",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-indigo-500",
    },
    {
      label: "فروش کل",
      value: new Intl.NumberFormat("fa-IR").format(totalRevenue) + " تومان",
      icon: DollarSign,
      color: "bg-green-500",
    },
  ];

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">پیشخوان</h1>
        <p className="text-gray-500 mt-1">خلاصه‌ای از وضعیت فروشگاه</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-white`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            فروش ماهانه
          </h2>
          {chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              داده‌ای برای نمایش وجود ندارد
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tick={{ fill: "#64748b" }}
                  />
                  <YAxis fontSize={12} tick={{ fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="فروش"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#4f46e5" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            سفارش‌های اخیر
          </h2>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">هنوز سفارشی ثبت نشده</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate max-w-30">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Number(order.total_price).toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusStyle[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </Link>
              ))}
              <Link
                href="/admin/orders"
                className="flex items-center justify-center text-indigo-600 text-sm font-medium hover:text-indigo-700 mt-2"
              >
                مشاهده همه
                <ArrowLeft className="w-4 h-4 mr-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
