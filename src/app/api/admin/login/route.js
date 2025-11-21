import { NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // For demo purposes, using hardcoded admin credentials
    // In production, you should use proper admin authentication
    if (username === 'admin' && password === 'admin123') {
      // Create or get admin user
      const adminUser = {
        _id: 'admin',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      };

      const token = generateToken(adminUser._id, adminUser.role);

      const response = NextResponse.json({ success: true });
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}