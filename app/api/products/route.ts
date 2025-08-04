// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Get all products
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    
    return NextResponse.json({ 
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        { 
          success: false,
          error: "Database authentication failed. Please check your MongoDB credentials.",
          details: "Verify your MongoDB Atlas username, password, and network access settings."
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    // Save product to DB
    const product = await prisma.product.create({
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
      message: "Product created successfully",
      data: product
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating product:', error);
    
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
        error: "Failed to create product",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
