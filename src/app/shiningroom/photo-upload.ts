// Resize on the device before uploading to fit serverless request limits.
export async function preparePhoto(file: File): Promise<File> {
  if (
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 30 * 1024 * 1024
  )
    throw new Error("Choose JPEG, PNG or WebP photos under 30 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 40000000)
      throw new Error("Choose a photo smaller than 40 megapixels.");
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser cannot prepare this image.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (result) =>
          result
            ? resolve(result)
            : reject(new Error("Could not convert photo.")),
        "image/webp",
        0.88,
      ),
    );
    if (blob.size > 4 * 1024 * 1024)
      throw new Error("Photo is still too large. Try a smaller image.");
    return new File([blob], "upload.webp", { type: blob.type });
  } finally {
    bitmap.close();
  }
}
