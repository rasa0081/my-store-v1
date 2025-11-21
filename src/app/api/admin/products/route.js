import { NextResponse } from 'next/server';
import { getAllProducts } from '../../../../lib/products';
import { requireAdmin } from '../../../../lib/auth';

export async function GET(request) {
  try {
    const { isAdmin } = await requireAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { isAdmin } = await requireAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const productData = await request.json();
    
    // In a real application, you would save to database
    // For now, we'll just return the data
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}