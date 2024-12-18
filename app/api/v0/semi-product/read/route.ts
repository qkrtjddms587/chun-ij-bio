import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const semiProducts = await db.semiProduct.findMany({
    where: { deletedAt: null },
  });
  if (!semiProducts)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json(
    { success: true, data: semiProducts },
    { status: 200 }
  );
}
