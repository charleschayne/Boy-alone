import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    if (!supabase) {
      console.error('Supabase client failed to initialize. Check environment variables.');
      return NextResponse.json({ error: 'Database service unavailable' }, { status: 500 });
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ name, email, phone }]);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Failed to save to waitlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Waitlist Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
