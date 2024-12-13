import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const recipeId = parseInt(id);
  const exist = await db.recipe.findUnique({
    where: {
      id: recipeId,
    },
    select: {
      id: true,
    },
  });
  if (!exist) return NextResponse.json({ success: false }, { status: 400 });

  const deleteRecipe = await db.recipe.update({
    where: { id: recipeId },
    data: { deletedAt: new Date() },
    select: { id: true },
  });
  if (!deleteRecipe)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
