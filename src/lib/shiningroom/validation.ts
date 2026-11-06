import type { Product } from "@/data/products";
export function validateProduct(value: unknown, publishing = true): Product {
  if (!value || typeof value !== "object")
    throw new Error("Product is required.");
  const p = value as Product;
  const text = (s: unknown, max = 10000) =>
    typeof s === "string" && s.length <= max;
  const image = (s: unknown) =>
    text(s, 2000) &&
    (/^\/assets\//.test(s as string) ||
      (() => {
        try {
          const url = new URL(s as string);
          return (
            url.origin ===
              new URL(
                process.env.NEXT_PUBLIC_SUPABASE_URL || "https://invalid.local",
              ).origin &&
            url.pathname.startsWith("/storage/v1/object/public/product-images/")
          );
        } catch {
          return false;
        }
      })());
  if (
    !text(p.id, 100) ||
    !/^[a-z0-9-]+$/.test(p.id) ||
    !text(p.slug, 120) ||
    ((publishing || p.slug !== "") &&
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) ||
    p.slug === "all"
  )
    throw new Error("Use a unique lowercase, hyphenated URL slug.");
  if (
    !text(p.name, 250) ||
    !p.name.trim() ||
    !/^\$\d{1,6}\.\d{2}$/.test(p.price) ||
    Number(p.price.slice(1)) < 0.5
  )
    throw new Error("Enter a name and a price of at least $0.50.");
  if (
    !Array.isArray(p.images) ||
    (publishing && p.images.length < 1) ||
    p.images.length > 30 ||
    !p.images.every(image)
  )
    throw new Error(
      "Add up to 30 product photos; publishing requires at least one.",
    );
  if (
    !Array.isArray(p.colors) ||
    p.colors.length < 1 ||
    p.colors.length > 30 ||
    !p.colors.every(
      (c) =>
        text(c.name, 80) &&
        c.name.trim() &&
        Array.isArray(c.sizes) &&
        c.sizes.length > 0 &&
        c.sizes.length <= 30 &&
        c.sizes.every((s) => text(s, 50) && s.trim()) &&
        (!c.featuredImage || image(c.featuredImage)),
    )
  )
    throw new Error("Each color needs a name and at least one size.");
  for (const field of ["description", "collection", "tagline"] as const)
    if (p[field] !== undefined && !text(p[field]))
      throw new Error("Invalid product text.");
  if (
    p.details &&
    (!Array.isArray(p.details) ||
      p.details.length > 50 ||
      !p.details.every((d) => text(d, 500)))
  )
    throw new Error("Invalid product details.");
  for (const flag of ["isSoldOut", "discountEligible"] as const)
    if (p[flag] !== undefined && typeof p[flag] !== "boolean")
      throw new Error("Invalid product setting.");
  if (
    p.discountPrices &&
    (!Array.isArray(p.discountPrices) ||
      p.discountPrices.length > 20 ||
      !p.discountPrices.every((d) => text(d.label, 200) && text(d.price, 30)))
  )
    throw new Error("Invalid discount information.");
  if (
    p.releaseSchedule &&
    (!Array.isArray(p.releaseSchedule) ||
      p.releaseSchedule.length > 10 ||
      !p.releaseSchedule.every((d) => text(d.label, 200) && text(d.dates, 200)))
  )
    throw new Error("Invalid release schedule.");
  return p;
}
