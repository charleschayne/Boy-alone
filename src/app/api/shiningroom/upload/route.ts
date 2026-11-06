import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireOwner } from "@/lib/shiningroom/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const db = await requireOwner(request);
    const form = await request.formData();
    const file = form.get("file");
    if (
      !(file instanceof File) ||
      file.size > 4 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    )
      return NextResponse.json(
        { error: "Choose a JPEG, PNG or WebP under 4 MB." },
        { status: 400 },
      );
    const buffer = await sharp(Buffer.from(await file.arrayBuffer()), {
      limitInputPixels: 40000000,
    })
      .rotate()
      .resize({
        width: 2000,
        height: 2000,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toBuffer();
    const name = `${crypto.randomUUID()}.webp`;
    const { error } = await db.storage
      .from("product-images")
      .upload(name, buffer, { contentType: "image/webp", upsert: false });
    if (error)
      throw new Error("Image upload failed. Check the product-images bucket.");
    return NextResponse.json({
      url: db.storage.from("product-images").getPublicUrl(name).data.publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 400,
      },
    );
  }
}
