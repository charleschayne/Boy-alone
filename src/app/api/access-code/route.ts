import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({ error: 'Member access is currently closed.' }, { status: 403 });
}
