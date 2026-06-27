import Link from "next/link";
import { ArrowLeft, Shield, Palette, Truck } from "lucide-react";

export const metadata = {
  title: "خوش‌آمدید | داشبورد گالری تژاو",
  description: "داشبورد مدیریت ادمین وبسایت گالری تژاو ",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <h1 className="text-xl font-bold text-gray-900">گالری تژاو</h1>
          <Link
            href="/auth/login"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            پنل مدیریت
          </Link>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            هنر دست‌های ایرانی
            <br />
            <span className="text-indigo-600">در خانه شما</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            فروشگاه اینترنتی تژاو، عرضه‌کننده محصولات سفالی و سرامیکی دست‌ساز با
            طراحی منحصربه‌فرد
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              href="/auth/login"
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-base font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
            >
              مشاهده محصولات
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          تمامی حقوق محفوظ است © گالری تژاو {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
