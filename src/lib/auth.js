import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dbConnect from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = '7d';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId, role) {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function createUser(userData) {
  await dbConnect();
  
  const hashedPassword = await hashPassword(userData.password);
  
  const user = new User({
    ...userData,
    password: hashedPassword
  });
  
  await user.save();
  return user;
}

export async function authenticateUser(email, password) {
  await dbConnect();
  
  const user = await User.findOne({ email, isActive: true });
  if (!user) {
    return null;
  }
  
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return null;
  }
  
  return user;
}

export async function getUserById(userId) {
  await dbConnect();
  return await User.findById(userId).select('-password');
}

export async function getUserByEmail(email) {
  await dbConnect();
  return await User.findOne({ email }).select('-password');
}

export async function updateUserProfile(userId, updateData) {
  await dbConnect();
  
  const { password, ...safeUpdateData } = updateData;
  
  return await User.findByIdAndUpdate(
    userId,
    safeUpdateData,
    { new: true }
  ).select('-password');
}

export async function requireAuth(request) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return { user: null, isAuthenticated: false };
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return { user: null, isAuthenticated: false };
  }
  
  const user = await getUserById(decoded.userId);
  return { user, isAuthenticated: !!user };
}

export async function requireAdmin(request) {
  const { user, isAuthenticated } = await requireAuth(request);
  
  if (!isAuthenticated || user.role !== 'admin') {
    return { user: null, isAuthenticated: false, isAdmin: false };
  }
  
  return { user, isAuthenticated: true, isAdmin: true };
}