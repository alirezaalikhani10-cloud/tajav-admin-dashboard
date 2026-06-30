import Link from "next/link";
import { Eye } from "lucide-react";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabel = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export default function OrderList({ orders }) {
  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          سفارش‌ها
        </h1>
        <p className="text-sm text-gray-500 mt-1">مدیریت سفارش‌های مشتریان</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">هنوز هیچ سفارشی ثبت نشده</p>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      شماره سفارش
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      مشتری
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      تعداد اقلام
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      مبلغ کل
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      وضعیت
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">
                        #{order.id.toString().slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {order.customer_name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {order.order_items?.[0]?.count ?? 0}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {Number(order.total_price).toLocaleString("fa-IR")}{" "}
                        تومان
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusStyle[order.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {statusLabel[order.status] || order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          مشاهده
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500">
                    #{order.id.toString().slice(0, 8)}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusStyle[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusLabel[order.status] || order.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.order_items?.[0]?.count ?? 0} قلم
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 text-sm">
                      {Number(order.total_price).toLocaleString("fa-IR")} تومان
                    </p>
                    <p className="text-indigo-600 text-xs mt-1 inline-flex items-center gap-1">
                      مشاهده جزئیات
                      <Eye className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
