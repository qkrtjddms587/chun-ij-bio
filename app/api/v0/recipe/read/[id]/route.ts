import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const recipeId = parseInt(id);

  const recipe = await db.recipe.findUnique({
    where: { id: recipeId, deletedAt: null },
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
  if (!recipe) return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true, data: recipe }, { status: 200 });
}
