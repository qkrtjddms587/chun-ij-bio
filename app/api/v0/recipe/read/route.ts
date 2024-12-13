import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const recipes = await db.recipe.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      materials: {
        include: {
          material: {
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
          },
        },
      },
    },
  });
  if (!recipes.length)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true, data: recipes }, { status: 200 });
}
