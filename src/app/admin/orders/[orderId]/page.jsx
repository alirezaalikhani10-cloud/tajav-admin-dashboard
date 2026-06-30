import { getOrderById, getOrders } from "@/lib/dataService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrderStatusUpdater from "@/components/admin/OrderStatusUpdater";

export async function generateStaticParams() {
  const orders = await getOrders();
  const ids = orders.map((order) => {
    return { orderId: String(order.id) };
  });
  return ids;
}

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

export const metadata = {
  title: "پنل مدیریت | جزئیات سفارش | گالری تژاو",
};

export default async function OrderDetailPage({ params }) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      <div className="flex items-center gap-3 md:gap-4">
        <Link
          href="/admin/orders"
          className="text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
            جزئیات سفارش #{order.id.toString().slice(0, 8)}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            تاریخ ثبت: {new Date(order.created_at).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
              اطلاعات مشتری
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1 text-xs md:text-sm">
                  نام مشتری
                </span>
                <span className="font-medium text-gray-800 text-sm md:text-base">
                  {order.customer_name}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1 text-xs md:text-sm">
                  تلفن
                </span>
                <span
                  className="font-medium text-gray-800 text-sm md:text-base"
                  dir="ltr"
                >
                  {order.customer_phone}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-gray-500 block mb-1 text-xs md:text-sm">
                  آدرس
                </span>
                <span className="font-medium text-gray-800 text-sm md:text-base">
                  {order.customer_address}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
              اقلام سفارش
            </h2>

            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      محصول
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      قیمت واحد
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      تعداد
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      جمع
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {order.order_items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {item.products?.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {Number(item.unit_price).toLocaleString("fa-IR")} تومان
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {Number(item.unit_price * item.quantity).toLocaleString(
                          "fa-IR",
                        )}{" "}
                        تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden space-y-3">
              {order.order_items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {item.products?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Number(item.unit_price).toLocaleString("fa-IR")} ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-800 text-sm flex-shrink-0 mr-3">
                    {Number(item.unit_price * item.quantity).toLocaleString(
                      "fa-IR",
                    )}{" "}
                    تومان
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-left">
              <span className="text-base md:text-lg font-bold text-gray-900">
                جمع کل: {Number(order.total_price).toLocaleString("fa-IR")}{" "}
                تومان
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
              وضعیت سفارش
            </h2>
            <div className="mb-4">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  statusStyle[order.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {statusLabel[order.status] || order.status}
              </span>
            </div>
            <OrderStatusUpdater
              orderId={order.id}
              currentStatus={order.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
