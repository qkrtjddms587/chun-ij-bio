import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const materialId = parseInt(id);

  const exist = await db.material.findUnique({
    where: {
      id: materialId,
    },
    select: {
      id: true,
    },
  });
  if (!exist) return NextResponse.json({ success: false }, { status: 400 });

  const deleteMaterial = await db.material.update({
    where: { id: materialId },
    data: { deletedAt: new Date() },
    select: { id: true },
  });
  if (!deleteMaterial)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
