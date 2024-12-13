import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const products = await db.product.findMany();
  if (!products) return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true, data: products }, { status: 200 });
}
