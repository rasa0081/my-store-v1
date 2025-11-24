import { NextResponse } from 'next/server';
import { generateToken } from '../../../../../lib/auth';
import User from '../../../../../models/User';
import dbConnect from '../../../../../lib/database';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // For demo - hardcoded admin credentials
    if (username === 'admin' && password === 'admin123') {
      // Check if demo admin user exists, if not create it
      let adminUser = await User.findOne({ email: 'admin@example.com' });
      
      if (!adminUser) {
        // Create demo admin user
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 12);
        
        adminUser = new User({
          email: 'admin@example.com',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin',
          role: 'admin'
        });
        
        await adminUser.save();
      }

      const token = generateToken(adminUser._id, adminUser.role);

      const response = NextResponse.json({
        success: true,
        user: {
          id: adminUser._id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          username: adminUser.username,
          role: adminUser.role
        }
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
      });

      return response;
    }

    // Regular admin user lookup
    const user = await User.findOne({ 
      $or: [
        { email: username },
        { username: username }
      ],
      role: 'admin'
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const bcrypt = await import('bcryptjs');
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id, user.role);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}