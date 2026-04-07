import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27', // Use the latest supported version
});

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        // Create a PaymentIntent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
