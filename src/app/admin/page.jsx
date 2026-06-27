import { getProducts, getOrders } from "@/lib/dataService";
import DashboardContent from "@/components/admin/DashboardContent";

export const metadata = {
  title: "پنل مدیریت | پیشخوان | گالری تژاو",
};

export default async function DashboardPage() {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + Number(o.total_price), 0);

  const monthlyMap = {};
  orders.forEach((order) => {
    const date = new Date(order.created_at);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!monthlyMap[key]) monthlyMap[key] = 0;
    monthlyMap[key] += Number(order.total_price);
  });
  const chartData = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, sales]) => ({ name, فروش: sales }));

  const recentOrders = orders
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <DashboardContent
      totalProducts={totalProducts}
      totalOrders={totalOrders}
      pendingOrders={pendingOrders}
      totalRevenue={totalRevenue}
      chartData={chartData}
      recentOrders={recentOrders}
    />
  );
}
