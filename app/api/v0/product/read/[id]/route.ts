import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const productId = parseInt(id);

  const product = await db.product.findUnique({
    where: { id: productId, deletedAt: null },
    include: {
      recipes: {
        include: {
          materials: { include: { material: true } },
        },
      },
      materials: true,
    },
  });
  if (!product) return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true, data: product }, { status: 200 });
}
