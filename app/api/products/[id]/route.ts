// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Get product by ID
    const product = await prisma.product.findUnique({
      where: {
        id: id
      }
    });

    if (!product) {
      return NextResponse.json(
        { 
          success: false,
          error: "Product not found" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        { 
          success: false,
          error: "Database authentication failed. Please check your MongoDB credentials."
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch product",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate required fields
    const { slug, image, price, isTopSell, translations } = body;
    
    if (!slug || !image || price === undefined || isTopSell === undefined || !translations) {
      return NextResponse.json(
        { 
          success: false,
          error: "Missing required fields: slug, image, price, isTopSell, translations" 
        },
        { status: 400 }
      );
    }

    // Validate translations array
    if (!Array.isArray(translations) || translations.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: "Translations must be a non-empty array" 
        },
        { status: 400 }
      );
    }

    // Validate each translation object
    for (const translation of translations) {
      if (!translation.lang || !translation.name || !translation.description) {
        return NextResponse.json(
          { 
            success: false,
            error: "Each translation must have lang, name, and description" 
          },
          { status: 400 }
        );
      }
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { 
          success: false,
          error: "Product not found" 
        },
        { status: 404 }
      );
    }

    // Update product by ID
    const updatedProduct = await prisma.product.update({
      where: {
        id: id
      },
      data: {
        slug,
        image,
        price: parseFloat(price),
        isTopSell: Boolean(isTopSell),
        translations
      }
    });

    return NextResponse.json({ 
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        { 
          success: false,
          error: "Database authentication failed. Please check your MongoDB credentials."
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to update product",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log('DELETE request received for ID:', id);
    
    // Check if product exists and get its data
    const existingProduct = await prisma.product.findUnique({
      where: { id: id }
    });

    console.log('Existing product found:', existingProduct ? 'Yes' : 'No');

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
          searchedId: id
        },
        { status: 404 }
      );
    }

    // Delete product by ID
    await prisma.product.delete({
      where: {
        id: id
      }
    });

    console.log('Product deleted successfully');

    return NextResponse.json({
      success: true,
      message: `Product deleted successfully`,
      deletedProduct: existingProduct
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        {
          success: false,
          error: "Database authentication failed. Please check your MongoDB credentials."
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
