import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    console.log('[api/submit-work-form] Received form data:', formData);
    console.log('[api/submit-work-form] Supabase client object state:', supabase ? 'Client Exists' : 'Client NULL');
    if (supabase && typeof supabase.from !== 'function') {
      console.error('[api/submit-work-form] CRITICAL: supabase.from is not a function! Client likely not initialized.');
      return NextResponse.json({ error: 'Supabase client not initialized on server.' }, { status: 500 });
    }

    // Attempt a simple read operation first for diagnostics
    try {
      console.log('[api/submit-work-form] Attempting diagnostic read from Supabase...');
      const { data: testData, error: testError } = await supabase
        .from('work_with_us')
        .select('id')
        .limit(1);

      if (testError) {
        console.error('[api/submit-work-form] Diagnostic read FAILED. Supabase error details:');
        console.error('Test Error message:', testError.message);
        console.error('Test Error code:', testError.code);
        console.error('Test Error details:', testError.details);
        console.error('Test Error hint:', testError.hint);
        console.error('Test Full error object stringified:', JSON.stringify(testError, null, 2));
        // Return early if diagnostic fails, as insert will also likely fail
        return NextResponse.json({ 
          error: testError.message || 'Supabase diagnostic read failed. Cannot proceed with insert.', 
          code: testError.code 
        }, { status: 500 });
      } else {
        console.log('[api/submit-work-form] Diagnostic read SUCCEEDED. Data:', testData);
      }
    } catch (diagCatchError: unknown) {
      console.error('[api/submit-work-form] CRITICAL error during diagnostic read block:', diagCatchError);
      let errorMessage = 'Critical error during Supabase diagnostic read.';
      if (diagCatchError instanceof Error) {
        errorMessage = 'Critical error during Supabase diagnostic read: ' + diagCatchError.message;
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
    
    // Proceed with insert if diagnostic read was okay
    const { name, experience, state, email, phone, notes } = formData;

    if (!name || !experience || !state || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('work_with_us')
      .insert([
        {
          name,
          experience,
          state,
          email,
          phone,
          notes,
        },
      ])
      .select(); // .select() is optional, but can be useful to get back the inserted row

    if (error) {
      console.error('Supabase caught an error. Details:');
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('Full error object stringified (fallback):', JSON.stringify(error, null, 2));
      return NextResponse.json({ 
        error: error.message || 'Supabase operation failed. Check server logs for specific Supabase error code and details.', 
        code: error.code 
      }, { status: 500 });
    }

    return NextResponse.json({ message: 'Form submitted successfully', data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 