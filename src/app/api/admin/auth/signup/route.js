import { NextResponse } from 'next/server';
import { generateToken, hashPassword } from '../../../../../lib/auth';
import User from '../../../../../models/User';
import dbConnect from '../../../../../lib/database';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { firstName, lastName, email, username, password } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !username || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email or username' },
        { status: 409 }
      );
    }

    // Create admin user
    const hashedPassword = await hashPassword(password);
    
    const adminUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      role: 'admin' // Always set role to admin for this route
    });
    
    await adminUser.save();

    // Generate token
    const token = generateToken(adminUser._id, adminUser.role);

    const response = NextResponse.json(
      { 
        message: 'Admin account created successfully',
        user: {
          id: adminUser._id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          username: adminUser.username,
          role: adminUser.role
        }
      },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;

  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}