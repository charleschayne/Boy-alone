import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    if (!supabase) {
      console.error('Supabase client failed to initialize. Check environment variables.');
      return NextResponse.json({ error: 'Database service unavailable' }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('access_codes')
      .select('code')
      .eq('code', code.trim())
      .eq('active', true)
      .maybeSingle();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Failed to verify access code' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Access Code Route Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}