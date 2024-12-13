import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MaterialSchema } from "../../../(z-schema)/material";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const materialId = parseInt(id);

  const body = await req.json();
  const validatedData = await MaterialSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json(
      { success: false, message: validatedData.error },
      { status: 400 }
    );
  const exist = await db.material.findUnique({
    where: {
      id: materialId,
    },
    select: {
      id: true,
    },
  });
  if (!exist)
    return NextResponse.json(
      { success: false, message: "not exist" },
      { status: 400 }
    );

  const updateMaterial = await db.material.update({
    where: { id: materialId },
    data: validatedData.data,
    select: { id: true },
  });
  if (!updateMaterial)
    return NextResponse.json(
      { success: false, message: "update failed" },
      { status: 400 }
    );
  return NextResponse.json({ success: true }, { status: 200 });
}
