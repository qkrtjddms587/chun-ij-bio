import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { MaterialSchema } from "../../(z-schema)/material";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = await MaterialSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json({ success: false }, { status: 400 });
  const exist = await db.material.findUnique({
    where: {
      code: validatedData.data!.code,
    },
    select: {
      id: true,
      deletedAt: true,
    },
  });
  if (exist) {
    if (!exist.deletedAt)
      return NextResponse.json({ success: false }, { status: 400 });

    const revivedMaterial = await db.material.update({
      where: {
        id: exist.id,
      },
      data: { ...validatedData.data, deletedAt: null },
      select: { id: true },
    });
    if (!revivedMaterial)
      return NextResponse.json({ success: false }, { status: 400 });
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const newMaterial = await db.material.create({
    data: { ...validatedData.data, MaterialStock: { create: { quantity: 0 } } },
    select: { id: true },
  });
  if (!newMaterial)
    return NextResponse.json({ success: false }, { status: 400 });

  return NextResponse.json({ success: true }, { status: 200 });
}
