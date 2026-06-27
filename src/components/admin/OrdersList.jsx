import Link from "next/link";
import { Eye } from "lucide-react";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrderList({ orders }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">سفارش‌ها</h1>
        <p className="text-gray-500 mt-1">مدیریت سفارش‌های مشتریان</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">هنوز هیچ سفارشی ثبت نشده</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                      {Number(order.total_price).toLocaleString("fa-IR")} تومان
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusStyle[order.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
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
      )}
    </div>
  );
}
