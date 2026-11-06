import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { publishedCollections, storeSettings } from "@/lib/shiningroom/server";
import { getPromoDiscountRate } from "@/lib/promo";
export async function POST(req: NextRequest) {
  try {
    if (!(await storeSettings()).is_open)
      return NextResponse.json(
        { error: "The store is currently closed." },
        { status: 403 },
      );
    const { productId, quantity, color, size, promoCode } = await req.json();
    const products = (await publishedCollections()).flatMap((c) => c.products);
    const product = products.find((p) => p.id === productId);
    if (
      !product ||
      product.isSoldOut ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 50 ||
      !product.colors.some((c) => c.name === color && c.sizes.includes(size))
    )
      return NextResponse.json(
        { error: "Choose an available product, size, and quantity (1–50)." },
        { status: 400 },
      );
    const discount =
      product.discountEligible === false
        ? 0
        : getPromoDiscountRate(typeof promoCode === "string" ? promoCode : "");
    const amount = Math.round(
      Number(product.price.replace(/[^0-9.]/g, "")) *
        100 *
        quantity *
        (1 - discount),
    );
    if (!Number.isFinite(amount) || amount < 50)
      throw new Error("Invalid price");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { productId, quantity: String(quantity), color, size },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch {
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
