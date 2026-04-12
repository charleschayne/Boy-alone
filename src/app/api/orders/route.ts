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
      state,
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
          address: `${address}, ${city}, ${state} ${zip}`,
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
          <p>Address: ${address}, ${city}, ${state} ${zip}</p>
        </div>
      `
    });

    const ownerEmailPromise = transporter.sendMail({
      from: `"BOY ALONE Admin" <${process.env.GMAIL_USER}>`,
      to: 'charleschayne11@gmail.com',
      subject: `🔥 NEW SALE: $${total_amount} [${product_name}]`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 5px solid #000; line-height: 1.6;">
            <h1 style="text-transform: uppercase; letter-spacing: 5px; text-align: center; margin-bottom: 30px; font-style: italic;">NEW ORDER RECEIVED</h1>
            
            <div style="background: #f9f9f9; padding: 20px; margin-bottom: 30px; border: 1px solid #eee;">
                <h3 style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #888; margin-bottom: 10px;">CUSTOMER INFO</h3>
                <p style="margin: 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 0;"><strong>Address:</strong> ${address}, ${city}, ${state} ${zip}</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #888; margin-bottom: 10px;">ORDER DETAILS</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #eee; text-align: left;">
                        <th style="padding: 10px 0; font-size: 12px; text-transform: uppercase;">Product</th>
                        <th style="padding: 10px 0; font-size: 12px; text-transform: uppercase; text-align: center;">Qty</th>
                        <th style="padding: 10px 0; font-size: 12px; text-transform: uppercase; text-align: right;">Total</th>
                    </tr>
                    <tr>
                        <td style="padding: 20px 0;">
                            <p style="margin: 0; font-weight: bold; text-transform: uppercase;">${product_name}</p>
                            <p style="margin: 0; font-size: 10px; color: #777; text-transform: uppercase; letter-spacing: 1px;">
                                ${color} / ${size || 'Standard'}
                            </p>
                        </td>
                        <td style="padding: 20px 0; text-align: center; font-weight: bold;">${quantity}</td>
                        <td style="padding: 20px 0; text-align: right; font-weight: bold;">$${total_amount}</td>
                    </tr>
                </table>
            </div>

            <div style="border-top: 2px solid #000; pt: 20px;">
                <p style="margin: 0; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Reference ID</p>
                <p style="margin: 0; font-family: monospace; font-weight: bold;">${order.id}</p>
            </div>

            <div style="margin-top: 40px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SUPABASE_URL}" style="display: inline-block; background: #000; color: #fff; text-decoration: none; padding: 15px 30px; font-size: 10px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase;">VIEW ON SUPABASE</a>
            </div>
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
