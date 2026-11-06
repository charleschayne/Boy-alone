import "server-only";
import { createClient } from "@supabase/supabase-js";
import { collections as staticCollections, type Product, type Collection } from "@/data/products";
import { cache } from "react";

export function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    throw new Error("Configure Supabase URL and service role key.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
export async function requireOwner(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) throw new Error("Unauthorized");
  const db = database();
  const { data, error } = await db.auth.getUser(token);
  const allowed = (process.env.SHININGROOM_ADMIN_EMAILS || "")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (
    error ||
    !data.user?.email_confirmed_at ||
    !allowed.includes(data.user.email?.toLowerCase() || "")
  )
    throw new Error("Unauthorized");
  return db;
}
export type StoreSettings = {
  id: number;
  is_open: boolean;
  closed_message: string;
  updated_at: string;
};
export type ProductRecord = {
  id: string;
  data: Product;
  published_data: Product | null;
  status: "draft" | "published" | "archived";
  sort_order: number;
  published_sort_order: number;
  updated_at: string;
};
export const storeSettings = cache(async (): Promise<StoreSettings> => {
  try {
    const { data, error } = await database()
      .from("store_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (error || !data) throw error;
    return data;
  } catch {
    return { id: 1, is_open: true, closed_message: "", updated_at: "" };
  }
});
export async function publishedCollections(): Promise<Collection[]> {
  if (!(await storeSettings()).is_open) return [];
  try {
    return await databaseCollections();
  } catch {
    return staticCollections;
  }
}
async function databaseCollections(): Promise<Collection[]> {
  const { data, error } = await database()
    .from("catalog_products")
    .select("*")
    .eq("status", "published")
    .order("published_sort_order")
    .order("id");
  if (error) throw new Error("Catalog unavailable. Please try again shortly.");
  return (data as ProductRecord[])
    .filter((row) => row.published_data)
    .map((row) => {
      const p = row.published_data!;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.collection,
        featuredImage: p.images[0],
        hoverImage: p.images[1],
        products: [p],
      };
    });
}
