// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get all products
  return NextResponse.json({ message: "List of all products" });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Save product to DB
  return NextResponse.json({ message: "Product created", product: body });
}
