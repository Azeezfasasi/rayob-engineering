import { NextResponse } from 'next/server';
import { verifyUser } from '@/utils/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await verifyUser(email, password);

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', user });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
