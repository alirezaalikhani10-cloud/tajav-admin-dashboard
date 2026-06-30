"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default function ProductList({ products }) {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            محصولات
          </h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت محصولات فروشگاه</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-indigo-600 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5 md:gap-2 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="hidden sm:inline">محصول جدید</span>
          <span className="sm:hidden">جدید</span>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">هنوز هیچ محصولی ثبت نشده</p>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      تصویر
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      نام محصول
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      کالکشن
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      قیمت
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      موجودی
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
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            بدون عکس
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {product.collectionId}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {Number(product.price).toLocaleString("fa-IR")} تومان
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.quantity > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.quantity > 0 ? product.quantity : "ناموجود"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.inStock ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            فعال
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            غیرفعال
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            ویرایش
                          </Link>
                          <DeleteProductButton productId={product.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                      بدون عکس
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {Number(product.price).toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-gray-500">
                    کالکشن: {product.collectionId}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-medium ${
                      product.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.quantity > 0 ? product.quantity : "ناموجود"}
                  </span>
                  {product.inStock ? (
                    <span className="px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                      فعال
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                      غیرفعال
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-4 pt-2 border-t border-gray-50">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    ویرایش
                  </Link>
                  <DeleteProductButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
