import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      console.error('Gmail configuration missing');
      return NextResponse.json({ error: 'Mail service configuration missing' }, { status: 500 });
    }

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

    // 2. Transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // 3. Send emails to BOTH Buyer and Owner
    const buyerEmailPromise = transporter.sendMail({
      from: `"Boy Alone Store" <${process.env.GMAIL_USER}>`,
      to: email, // The customer's email
      subject: `Order Confirmed: ${product_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="text-transform: uppercase; letter-spacing: 2px;">Thank you for your order</h2>
          <p>We've received your order for the <strong>${product_name}</strong> and are preparing it now.</p>
          <hr />
          <p>Order Reference: <strong>${order.id.slice(0, 8).toUpperCase()}</strong></p>
          <p>Address: ${address}, ${city}, ${zip}</p>
        </div>
      `
    });

    const ownerEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'charleschayne11@gmail.com',
      subject: `🔥 NEW SALE: $${total_amount}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000;">
            <h2 style="text-transform: uppercase;">New Order Received</h2>
            <p><strong>Customer:</strong> ${name} (${email})</p>
            <p><strong>Shipping:</strong> ${address}, ${city}, ${zip}</p>
            <p><strong>Details:</strong> ${product_name} - ${color} / ${size}</p>
            <p><strong>Total:</strong> $${total_amount}</p>
        </div>
      `
    });

    await Promise.all([buyerEmailPromise, ownerEmailPromise]);

    return NextResponse.json({ success: true, order });

  } catch (error: any) {
    console.error('Order Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
