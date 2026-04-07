import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      address, 
      city, 
      zip, 
      product_id, 
      product_name, 
      total_amount, 
      quantity, 
      color, 
      size 
    } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      return NextResponse.json({ error: 'Mail service configuration missing' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!supabase) {
      console.error('Supabase client failed to initialize. Check environment variables.');
      return NextResponse.json({ error: 'Database service unavailable' }, { status: 500 });
    }

    // 1. Store the order in Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          name,
          email,
          address: `${address}, ${city}, ${zip}`,
          product_id,
          product_name,
          total_amount,
          quantity,
          color,
          size,
          status: 'paid'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json({ error: 'Failed to store order in database' }, { status: 500 });
    }

    // 2. Send email notification via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Boy Alone Store <orders@resend.dev>', // Replace with your verified domain in production
      to: 'charleschayne11@gmail.com',
      subject: `New Order: ${product_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="text-transform: uppercase; letter-spacing: 2px;">New Order Received</h2>
          <hr />
          <p><strong>Customer:</strong> ${name} (${email})</p>
          <p><strong>Shipping Address:</strong> ${address}, ${city}, ${zip}</p>
          <hr />
          <h3>Order Details:</h3>
          <p><strong>Product:</strong> ${product_name}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Color:</strong> ${color}</p>
          <p><strong>Size:</strong> ${size}</p>
          <p><strong>Total:</strong> $${total_amount}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This order was processed via Stripe and is ready for fulfillment.</p>
        </div>
      `
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      // We don't return an error here because the order was already saved
    }

    return NextResponse.json({ success: true, order });

  } catch (error: any) {
    console.error('Order Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
