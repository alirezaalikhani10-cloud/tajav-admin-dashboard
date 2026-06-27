import { getOrders } from "@/lib/dataService";
import OrdersList from "@/components/admin/OrdersList";

export const metadata = {
  title: "پنل مدیریت | سفارشات | گالری تژاو",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return <OrdersList orders={orders} />;
}
