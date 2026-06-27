"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Layers,
  Store,
} from "lucide-react";

const links = [
  { href: "/admin", label: "پیشخوان", icon: LayoutDashboard },
  { href: "/admin/products", label: "محصولات", icon: Package },
  { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingCart },
  { href: "/", label: "مشاهده فروشگاه", icon: Store },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">گالری تژاو</h1>
        <p className="text-xs text-slate-400 mt-1">پنل مدیریت</p>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">نسخه ۱.۰</p>
      </div>
    </aside>
  );
}
