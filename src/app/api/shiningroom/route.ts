import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/shiningroom/server";
import { validateProduct } from "@/lib/shiningroom/validation";
import { getAllProducts } from "@/data/products";
export const dynamic = "force-dynamic";

function failure(error: unknown) {
  const message = error instanceof Error ? error.message : "Request failed.";
  return NextResponse.json(
    { error: message },
    { status: message === "Unauthorized" ? 401 : 400 },
  );
}
export async function GET(request: Request) {
  try {
    const db = await requireOwner(request);
    const [products, settings] = await Promise.all([
      db.from("catalog_products").select("*").order("sort_order").order("id"),
      db.from("store_settings").select("*").eq("id", 1).single(),
    ]);
    if (products.error || settings.error)
      throw new Error(
        "Unable to load the store. Verify the database connection and apply the Shining Room migration.",
      );
    return NextResponse.json(
      { products: products.data, settings: settings.data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    const db = await requireOwner(request);
    const body = await request.json();
    const updated_at = new Date().toISOString();
    if (body.action === "import") {
      const rows = getAllProducts().map((p, index) => ({
        id: p.id,
        data: p,
        published_data: p,
        status: "published",
        sort_order: index * 10,
        published_sort_order: index * 10,
      }));
      const { error } = await db
        .from("catalog_products")
        .upsert(rows, { onConflict: "id", ignoreDuplicates: true });
      if (error) throw new Error("Catalog import failed.");
    } else if (body.action === "settings") {
      if (
        typeof body.is_open !== "boolean" ||
        typeof body.closed_message !== "string" ||
        body.closed_message.length > 500 ||
        typeof body.updated_at !== "string"
      )
        throw new Error("Invalid store settings.");
      if (body.is_open) {
        const { data, error } = await db
          .from("catalog_products")
          .select("id")
          .eq("status", "published")
          .limit(1);
        if (error || !data?.length)
          throw new Error(
            "Publish at least one item before opening the store.",
          );
      }
      const { data, error } = await db
        .from("store_settings")
        .update({
          is_open: body.is_open,
          closed_message: body.closed_message,
          updated_at,
        })
        .eq("id", 1)
        .eq("updated_at", body.updated_at)
        .select("id")
        .maybeSingle();
      if (error || !data)
        throw new Error(
          "Store settings changed or could not be saved. Refresh and try again.",
        );
    } else if (body.action === "archive") {
      if (
        typeof body.id !== "string" ||
        typeof body.expectedUpdatedAt !== "string"
      )
        throw new Error("Invalid archive request.");
      const { data, error } = await db
        .from("catalog_products")
        .update({ status: "archived", updated_at })
        .eq("id", body.id)
        .eq("updated_at", body.expectedUpdatedAt)
        .select("id")
        .maybeSingle();
      if (error || !data)
        throw new Error(
          "Item changed or could not be archived. Refresh and try again.",
        );
    } else if (body.action === "save" || body.action === "publish") {
      const publishing = body.action === "publish";
      const product = validateProduct(body.product, publishing);
      if (
        !Number.isInteger(body.sort_order) ||
        Math.abs(body.sort_order) > 1000000
      )
        throw new Error("Invalid display order.");
      const { data: existing, error: readError } = await db
        .from("catalog_products")
        .select("published_data,updated_at")
        .eq("id", product.id)
        .maybeSingle();
      if (readError) throw new Error("Unable to load existing product.");
      if (existing && body.expectedUpdatedAt !== existing.updated_at)
        throw new Error(
          "This item changed in another session. Close the editor, refresh, and try again.",
        );
      if (
        existing?.published_data &&
        existing.published_data.slug !== product.slug
      )
        throw new Error(
          "Published URLs cannot be changed. Duplicate the item to use a new URL.",
        );
      const changes = {
        data: product,
        sort_order: body.sort_order,
        updated_at,
        ...(publishing
          ? {
              published_data: product,
              published_sort_order: body.sort_order,
              status: "published",
            }
          : {}),
      };
      const result = existing
        ? await db
            .from("catalog_products")
            .update(changes)
            .eq("id", product.id)
            .eq("updated_at", existing.updated_at)
            .select("id")
            .maybeSingle()
        : await db
            .from("catalog_products")
            .insert({ id: product.id, ...changes })
            .select("id")
            .single();
      if (result.error || !result.data)
        throw new Error(
          "Unable to save. Refresh and check that the published URL is unique.",
        );
    } else throw new Error("Unknown action.");
    return NextResponse.json({ success: true });
  } catch (error) {
    return failure(error);
  }
}
