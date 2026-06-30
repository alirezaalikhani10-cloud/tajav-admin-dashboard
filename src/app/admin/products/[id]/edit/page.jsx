import EditProductForm from "@/components/admin/EditProductForm";
import { getProducts } from "@/lib/dataService";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const products = await getProducts();
  const ids = products.map((product) => {
    return { id: String(product.id) };
  });
  return ids;
}

export default async function EditProductPage({ params }) {
  const { id } = await params;

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
          <h1 className="text-2xl font-bold text-gray-900">ویرایش محصول</h1>
          <p className="text-gray-500 text-sm mt-1">
            اطلاعات محصول را ویرایش کنید
          </p>
        </div>
      </div>

      <EditProductForm id={id} />
    </div>
  );
}
