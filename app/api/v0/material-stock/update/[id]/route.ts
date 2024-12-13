import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MaterialStockSchema } from "../../../(z-schema)/materialStock";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const materialId = parseInt(id);

  const body = await req.json();
  const validatedData = await MaterialStockSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json(
      { success: false, message: validatedData.error },
      { status: 400 }
    );
  const exist = await db.materialStock.findUnique({
    where: {
      materialId,
    },
    select: {
      quantity: true,
    },
  });
  if (!exist)
    return NextResponse.json(
      { success: false, message: "not exist" },
      { status: 400 }
    );

  const updateMaterial = await db.materialStock.update({
    where: { materialId },
    data: { quantity: exist.quantity + validatedData.data.quantity },
    select: { quantity: true },
  });
  if (!updateMaterial)
    return NextResponse.json(
      { success: false, message: "update failed" },
      { status: 400 }
    );
  return NextResponse.json(
    { success: true, data: updateMaterial },
    { status: 200 }
  );
}
