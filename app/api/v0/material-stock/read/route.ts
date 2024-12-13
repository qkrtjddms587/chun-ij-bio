import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const materialStock = await db.materialStock.findMany({
    include: { material: true },
  });
  if (!materialStock)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json(
    { success: true, data: materialStock },
    { status: 200 }
  );
}
