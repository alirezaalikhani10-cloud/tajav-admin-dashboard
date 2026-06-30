"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  getProduct,
  updateProduct,
  uploadProductImage,
} from "@/lib/dataService";
import { ArrowRight, Upload, Save } from "lucide-react";
import Link from "next/link";

export default function EditProductForm({ id }) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "پنل مدیریت | ویرایش محصول | گالری تژاو";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function load() {
      try {
        const product = await getProduct(id);
        reset({
          name: product.name,
          price: product.price,
          collection: product.collectionId,
          description: product.description || "",
          quantity: product.quantity,
          inStock: product.inStock,
        });
        setCurrentImage(product.image);
      } catch (error) {
        alert("خطا در دریافت اطلاعات محصول: " + error.message);
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id, reset, router]);

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
      let imageUrl = currentImage;
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      await updateProduct(id, {
        name: data.name,
        price: Number(data.price),
        collectionId: Number(data.collection),
        description: data.description || "",
        quantity: Number(data.quantity),
        inStock: data.inStock || false,
        image: imageUrl,
      });

      router.push("/admin/products");
    } catch (error) {
      alert("خطا در ویرایش محصول: " + error.message);
    } finally {
      setSaving(false);
    }
  };
  return (
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
            min: { value: 0 },
            max: { value: 5 },
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
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.quantity.message}
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
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          تصویر محصول
        </label>
        <label
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors relative ${
            imagePreview || currentImage
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
          ) : currentImage ? (
            <img
              src={currentImage}
              alt="Current"
              className="w-32 h-32 object-cover rounded-lg mb-3"
            />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
          )}
          <span className="text-sm text-gray-500">
            {imagePreview || currentImage
              ? "تغییر تصویر"
              : "کلیک کنید یا تصویر را بکشید"}
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
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
        <Link
          href="/admin/products"
          className="text-gray-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          انصراف
        </Link>
      </div>
    </form>
  );
}
