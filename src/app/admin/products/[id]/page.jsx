import { getProduct } from "@/lib/dataService";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { name } = await getProduct(id);
  console.log(name);
  return { title: `${name}` };
}

export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}
