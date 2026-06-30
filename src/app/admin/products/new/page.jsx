"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createProduct, uploadProductImage } from "@/lib/dataService";
import { ArrowRight, Upload, Save } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "پنل مدیریت | ایجاد محصول جدید | گالری تژاو";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      await createProduct({
        name: data.name,
        price: Number(data.price),
        description: data.description || "",
        collectionId: Number(data.collection),
        quantity: Number(data.quantity),
        inStock: data.inStock || false,
        image: imageUrl,
      });

      router.push("/admin/products");
    } catch (error) {
      alert("خطا در ثبت محصول: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">محصول جدید</h1>
          <p className="text-gray-500 text-sm mt-1">
            اطلاعات محصول را وارد کنید
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام محصول
          </label>
          <input
            {...register("name", { required: "نام محصول الزامی است" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
            placeholder="مثلاً: گلدان سفالی دست‌ساز"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            کد کالکشن: <br />
            1: مینیمال <br />
            2: آشپزخانه <br />
            3: گل‌رو <br />
            4: حیوانات <br />
            5: اکسسوری لوازم آرایشی
          </label>
          <input
            type="number"
            {...register("collection", {
              required: "کد کالکشن الزامی است",
              min: { value: 0, message: "کد باید بین 1 تا 5 باشد" },
              max: { value: 5, message: "کد باید بین 1 تا 5 باشد" },
            })}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              قیمت (تومان)
            </label>
            <input
              type="number"
              {...register("price", {
                required: "قیمت الزامی است",
                min: { value: 0, message: "قیمت نمی‌تواند منفی باشد" },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
              placeholder="۰"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              موجودی
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "موجودی الزامی است",
                min: { value: 0, message: "موجودی نمی‌تواند منفی باشد" },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
              placeholder="۰"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            توضیحات
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow resize-none"
            placeholder="توضیحات محصول..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تصویر محصول
          </label>
          <label
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors relative ${
              imagePreview
                ? "border-indigo-300 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            }`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mb-3"
              />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
            )}
            <span className="text-sm text-gray-500">
              {imagePreview ? "تغییر تصویر" : "کلیک کنید یا تصویر را بکشید"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="inStock"
            {...register("inStock")}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="inStock" className="text-sm text-gray-700">
            محصول فعال باشد
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "در حال ذخیره..." : "ذخیره محصول"}
          </button>
          <Link
            href="/admin/products"
            className="text-gray-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            انصراف
          </Link>
        </div>
      </form>
    </div>
  );
}
