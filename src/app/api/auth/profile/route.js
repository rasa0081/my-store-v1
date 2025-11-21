import { NextResponse } from 'next/server';
import { requireAuth, updateUserProfile } from '../../../../lib/auth';

export async function PUT(request) {
  try {
    const { user, isAuthenticated } = await requireAuth(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const updateData = await request.json();

    if (!updateData.firstName || !updateData.lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      );
    }

    const updatedUser = await updateUserProfile(user._id, updateData);

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}