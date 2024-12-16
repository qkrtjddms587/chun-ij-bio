import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { SemiProductSchema } from "../../(z-schema)/semiProduct";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = await SemiProductSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json(
      { success: false, message: validatedData.error },
      { status: 400 }
    );
  const exist = await db.semiProduct.findUnique({
    where: {
      code: validatedData.data!.code,
    },
    select: {
      id: true,
    },
  });
  if (exist)
    return NextResponse.json(
      { success: false, message: "product is exist" },
      { status: 400 }
    );
  const newSemiProduct = await db.semiProduct.create({
    data: {
      ...validatedData.data,
      recipes: { connect: validatedData.data.recipes },
      materials: { connect: validatedData.data.materials },
      products: { connect: validatedData.data.products },
    },
    select: { id: true },
  });
  if (!newSemiProduct)
    return NextResponse.json(
      { success: false, message: "product create failed" },
      { status: 400 }
    );
  return NextResponse.json({ success: true }, { status: 200 });
}
