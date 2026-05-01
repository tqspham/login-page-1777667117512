import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-init-secret');
  const initSecret = process.env.INIT_SECRET;

  if (!initSecret || authHeader !== initSecret) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const initSql = process.env.INIT_SQL;
  if (!initSql) {
    return NextResponse.json(
      { ok: false, error: 'INIT_SQL not provided' },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase.rpc('exec_sql', { sql: initSql });
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
