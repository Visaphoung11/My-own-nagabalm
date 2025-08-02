// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  // Get product by ID
  return NextResponse.json({ message: `Product ${id} found` });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();
  // Update product by ID
  return NextResponse.json({ message: `Product ${id} updated`, data: body });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  // Delete product by ID
  return NextResponse.json({ message: `Product ${id} deleted` });
}
