import { notFound } from "next/navigation";
import { supabase } from "./supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
  }
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createProduct(newProduct) {
  const { data, error } = await supabase
    .from("products")
    .insert([newProduct])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("محصول جدید ایجاد نشد!");
  }

  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("محصول مورد نظر حذف نشد");
  }
  return data;
}

export async function uploadProductImage(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("all-products")
    .upload(fileName, file);

  console.log("upload result:", { data, error });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from("all-products")
    .getPublicUrl(fileName);

  console.log("public url:", publicData);

  return publicData.publicUrl;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(count)");
  if (error) throw error;
  return data;
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(id,quantity,unit_price,products(name))`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
