"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/dataService";

export default function DeleteProductButton({ productId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("آیا از حذف این محصول مطمئن هستید؟")) return;

    try {
      await deleteProduct(productId);
      router.refresh();
    } catch (error) {
      alert("خطا در حذف محصول: " + error.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 text-sm font-medium cursor-pointer"
    >
      <Trash2 className="w-4 h-4" />
      حذف
    </button>
  );
}
