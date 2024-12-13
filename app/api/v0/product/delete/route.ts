import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = await params;
  const productId = parseInt(id);

  const deleteProduct = await db.product.update({
    where: { id: productId },
    data: { deletedAt: new Date() },
    select: { id: true },
  });
  if (!deleteProduct)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
