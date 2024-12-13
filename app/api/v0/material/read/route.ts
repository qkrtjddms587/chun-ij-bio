import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const materials = await db.material.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      classification1: true,
      classification2: true,
      classification3: true,
      unit: true,
      etc: true,
      code: true,
    },
  });
  if (!materials) return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true, data: materials }, { status: 200 });
}
