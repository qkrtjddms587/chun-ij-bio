import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { SemiProductSchema } from "../../(z-schema)/semiProduct";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const productId = parseInt(id);
  const body = await req.json();
  const validatedData = await SemiProductSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json({ success: false }, { status: 400 });
  const exist = await db.semiProduct.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  });
  if (!exist) return NextResponse.json({ success: false }, { status: 400 });
  const updateProduct = await db.semiProduct.update({
    where: { id: productId },
    data: {
      ...validatedData.data,
      recipes: { connect: validatedData.data.recipes },
      materials: { connect: validatedData.data.materials },
      products: { connect: validatedData.data.products },
    },
    select: { id: true },
  });
  if (!updateProduct)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
