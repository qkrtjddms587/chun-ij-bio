import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const semiProductId = parseInt(id);

  const semiProduct = await db.semiProduct.findUnique({
    where: { id: semiProductId, deletedAt: null },
    include: {
      recipes: {
        where: {
          deletedAt: null,
        },
        include: {
          materials: { include: { material: true } },
        },
      },
      materials: true,
    },
  });
  if (!semiProduct)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json(
    { success: true, data: semiProduct },
    { status: 200 }
  );
}
