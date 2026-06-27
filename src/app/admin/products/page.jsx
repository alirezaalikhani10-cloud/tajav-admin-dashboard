import { getProducts } from "@/lib/dataService";

import ProductsList from "@/components/admin/ProductsList";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

export const metadata = {
  title: "پنل مدیریت | محصولات | گالری تژاو",
};

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ProductsList products={products} />
      </Suspense>
      <div></div>
    </>
  );
}
