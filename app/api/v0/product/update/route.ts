import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "../../(z-schema)/product";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const productId = parseInt(id);
  const body = await req.json();
  const validatedData = await ProductSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json({ success: false }, { status: 400 });
  const exist = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  });
  if (!exist) return NextResponse.json({ success: false }, { status: 400 });
  const updateProduct = await db.product.update({
    where: { id: productId },
    data: validatedData.data,
    select: { id: true },
  });
  if (!updateProduct)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
